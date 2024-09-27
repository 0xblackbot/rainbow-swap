import {createReducer} from '@reduxjs/toolkit';

import {loadSwapRoutesActions} from './swap-routes-actions';
import {swapRouteInitialState, SwapRoutesState} from './swap-routes-state';
import {createEntity} from '../utils/create-entity';

export const swapRoutesReducers = createReducer<SwapRoutesState>(
    swapRouteInitialState,
    builder => {
        builder.addCase(loadSwapRoutesActions.submit, (state, {payload}) => ({
            ...state,
            batch: createEntity(state.batch.data, true),
            lastRequestId: payload.requestId
        }));
        builder.addCase(loadSwapRoutesActions.success, (state, {payload}) => ({
            ...state,
            batch: createEntity(payload.bestRoute, false),
            priceImprovement: payload.priceImprovement,
            lastRequestId:
                state.lastRequestId === payload.requestId
                    ? undefined
                    : state.lastRequestId
        }));
        builder.addCase(loadSwapRoutesActions.fail, (state, {payload}) => ({
            ...state,
            batch: createEntity([], false, payload.error),
            priceImprovement: 0,
            lastRequestId:
                state.lastRequestId === payload.requestId
                    ? undefined
                    : state.lastRequestId
        }));
    }
);
