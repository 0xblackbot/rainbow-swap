import {createReducer} from '@reduxjs/toolkit';

import {assetsInitializedAction, setAssetsSearchValue} from './runtime-actions';
import {initializedInitialState, RuntimeState} from './runtime-state';

export const runtimeReducers = createReducer<RuntimeState>(
    initializedInitialState,
    builder => {
        builder.addCase(assetsInitializedAction, state => ({
            ...state,
            isAssetsInitialized: true
        }));

        builder.addCase(setAssetsSearchValue, (state, {payload}) => ({
            ...state,
            assetsSearchValue: payload
        }));
    }
);
