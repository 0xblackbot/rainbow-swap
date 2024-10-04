import {createReducer} from '@reduxjs/toolkit';

import {loadSwapRoutesActions} from './swap-routes-actions';
import {
    emptyBestRouteResponse,
    swapRouteInitialState,
    SwapRoutesState
} from './swap-routes-state';
import {createEntity} from '../utils/create-entity';

export const swapRoutesReducers = createReducer<SwapRoutesState>(
    swapRouteInitialState,
    builder => {
        builder.addCase(loadSwapRoutesActions.submit, (state, {payload}) => ({
            ...state,
            bestRouteResponse: createEntity(state.bestRouteResponse.data, true),
            lastRequestId: payload.requestId
        }));
        builder.addCase(
            loadSwapRoutesActions.success,
            (state, {payload: {requestId, ...payload}}) => ({
                ...state,
                bestRouteResponse: createEntity(payload, false),
                lastRequestId:
                    state.lastRequestId === requestId
                        ? undefined
                        : state.lastRequestId
            })
        );
        builder.addCase(loadSwapRoutesActions.fail, (state, {payload}) => ({
            ...state,
            bestRouteResponse: createEntity(
                emptyBestRouteResponse,
                false,
                payload.error
            ),
            lastRequestId:
                state.lastRequestId === payload.requestId
                    ? undefined
                    : state.lastRequestId
        }));
    }
);
