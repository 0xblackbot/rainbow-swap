import {createReducer} from '@reduxjs/toolkit';

import {balancesActions} from './balances-actions';
import {balancesInitialState, BalancesState} from './balances-state';
import {createEntity} from '../utils/create-entity';

export const balancesReducers = createReducer<BalancesState>(
    balancesInitialState,
    builder => {
        builder.addCase(balancesActions.submit, state => ({
            ...state,
            record: createEntity(state.balances.data, true)
        }));
        builder.addCase(balancesActions.success, (state, {payload}) => ({
            ...state,
            record: createEntity(payload, false)
        }));
        builder.addCase(balancesActions.fail, (state, {payload: error}) => ({
            ...state,
            record: createEntity(state.balances.data, false, error)
        }));
    }
);
