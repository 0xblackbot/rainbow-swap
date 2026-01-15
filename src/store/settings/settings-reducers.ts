import {createReducer} from '@reduxjs/toolkit';

import {
    setExplorerAction,
    setMaxSlippageAction,
    setMaxSplitsAction,
    setRiskToleranceAction,
    setThemeAction
} from './settings-actions';
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

        builder.addCase(setMaxSplitsAction, (state, {payload}) => ({
            ...state,
            maxSplits: payload
        }));

        builder.addCase(setThemeAction, (state, {payload}) => ({
            ...state,
            theme: payload
        }));

        builder.addCase(setExplorerAction, (state, {payload}) => ({
            ...state,
            explorer: payload
        }));
    }
);
