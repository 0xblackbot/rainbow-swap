import {createReducer} from '@reduxjs/toolkit';

import {loadAppStatusActions} from './security-actions';
import {securityInitialState, SecurityState} from './security-state';
import {createEntity} from '../utils/create-entity';

export const securityReducers = createReducer<SecurityState>(
    securityInitialState,
    builder => {
        builder.addCase(loadAppStatusActions.submit, state => ({
            ...state,
            appStatus: createEntity(state.appStatus.data, true)
        }));
        builder.addCase(loadAppStatusActions.success, (state, {payload}) => ({
            ...state,
            appStatus: createEntity(payload, false)
        }));
        builder.addCase(
            loadAppStatusActions.fail,
            (state, {payload: error}) => ({
                ...state,
                appStatus: createEntity(state.appStatus.data, false, error)
            })
        );
    }
);
