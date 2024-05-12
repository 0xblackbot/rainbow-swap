import {createReducer} from '@reduxjs/toolkit';

import {loadAssetsActions} from './assets-actions';
import {assetsInitialState, AssetsState} from './assets-state';
import {createEntity} from '../utils/create-entity';

export const assetsReducers = createReducer<AssetsState>(
    assetsInitialState,
    builder => {
        builder.addCase(loadAssetsActions.submit, state => ({
            ...state,
            record: createEntity(state.record.data, true)
        }));
        builder.addCase(loadAssetsActions.success, (state, {payload}) => ({
            ...state,
            record: createEntity(payload, false)
        }));
        builder.addCase(loadAssetsActions.fail, (state, {payload: error}) => ({
            ...state,
            record: createEntity(state.record.data, false, error)
        }));
    }
);
