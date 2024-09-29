import {createReducer} from '@reduxjs/toolkit';

import {setMaxSlippageAction, setRiskToleranceAction} from './settings-actions';
import {settingsInitialState, SettingsState} from './settings-state';

export const settingsReducers = createReducer<SettingsState>(
    settingsInitialState,
    builder => {
        builder.addCase(setMaxSlippageAction, (state, {payload}) => ({
            ...state,
            maxSlippage: payload
        }));

        builder.addCase(setRiskToleranceAction, (state, {payload}) => ({
            ...state,
            riskTolerance: payload
        }));
    }
);
