import {createReducer} from '@reduxjs/toolkit';

import {loadSwapRoutesActions} from './swap-routes-actions';
import {swapRouteInitialState, SwapRoutesState} from './swap-routes-state';
import {createEntity} from '../utils/create-entity';

export const swapRoutesReducers = createReducer<SwapRoutesState>(
    swapRouteInitialState,
    builder => {
        builder.addCase(loadSwapRoutesActions.submit, state => ({
            ...state,
            batch: createEntity(state.batch.data, true)
        }));
        builder.addCase(loadSwapRoutesActions.success, (state, {payload}) => {
            const newBestRoute =
                'bestRoute' in payload ? payload.bestRoute : payload;

            return {
                ...state,
                batch: createEntity(newBestRoute, false)
            };
        });
        builder.addCase(
            loadSwapRoutesActions.fail,
            (state, {payload: error}) => ({
                ...state,
                batch: createEntity([], false, error)
            })
        );
    }
);
