import {createReducer} from '@reduxjs/toolkit';

import {setSlippageToleranceAction} from './settings-actions';
import {settingsInitialState, SettingsState} from './settings-state';

export const settingsReducers = createReducer<SettingsState>(
    settingsInitialState,
    builder => {
        builder.addCase(setSlippageToleranceAction, (state, {payload}) => ({
            ...state,
            slippageTolerance: payload
        }));
    }
);
