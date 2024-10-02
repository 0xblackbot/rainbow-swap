import {createReducer} from '@reduxjs/toolkit';

import {assetsInitializedAction} from './initialized-actions';
import {initializedInitialState, InitializedState} from './initialized-state';

export const initializedReducers = createReducer<InitializedState>(
    initializedInitialState,
    builder => {
        builder.addCase(assetsInitializedAction, state => ({
            ...state,
            assets: true
        }));
    }
);
