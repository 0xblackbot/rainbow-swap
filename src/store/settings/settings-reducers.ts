import {createReducer} from '@reduxjs/toolkit';

import {
    enableAllDexGroupsAction,
    setExplorerAction,
    setMaxSlippageAction,
    setMaxSplitsAction,
    setRiskToleranceAction,
    setThemeAction,
    toggleDisabledDexGroupAction
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

        builder.addCase(toggleDisabledDexGroupAction, (state, {payload}) => {
            const disabledDexGroups = state.disabledDexGroups ?? [];
            const isDisabled = disabledDexGroups.includes(payload);

            return {
                ...state,
                disabledDexGroups: isDisabled
                    ? disabledDexGroups.filter(dexGroup => dexGroup !== payload)
                    : [...disabledDexGroups, payload]
            };
        });

        builder.addCase(enableAllDexGroupsAction, state => ({
            ...state,
            disabledDexGroups: []
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
