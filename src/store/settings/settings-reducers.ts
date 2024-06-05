import {createReducer} from '@reduxjs/toolkit';

import {setSlippageToleranceActions} from './settings-actions.ts';
import {settingsInitialState, SettingsState} from './settings-state.ts';

export const settingsReducers = createReducer<SettingsState>(
    settingsInitialState,
    builder => {
        builder.addCase(
            setSlippageToleranceActions.submit,
            (state, {payload}) => ({
                ...state,
                slippageTolerance: payload
            })
        );
    }
);
