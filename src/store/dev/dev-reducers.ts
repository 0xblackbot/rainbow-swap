import {createReducer} from '@reduxjs/toolkit';

import {setDevVersionAction} from './dev-actions.ts';
import {devInitialState, DevState} from './dev-state.ts';

export const devReducers = createReducer<DevState>(devInitialState, builder => {
    builder.addCase(setDevVersionAction, (state, {payload}) => ({
        ...state,
        stateVersion: payload
    }));
});
