import {createReducer} from '@reduxjs/toolkit';

import {
    addPendingSwapTransactionActions,
    loadBalancesActions,
    loadExchangeRates
} from './wallet-actions.ts';
import {walletInitialState, WalletState} from './wallet-state.ts';
import {createEntity} from '../utils/create-entity.ts';

export const walletReducers = createReducer<WalletState>(
    walletInitialState,
    builder => {
        builder.addCase(loadBalancesActions.submit, state => ({
            ...state,
            balances: createEntity(state.balances.data, true)
        }));
        builder.addCase(loadBalancesActions.success, (state, {payload}) => ({
            ...state,
            balances: createEntity(payload, false)
        }));
        builder.addCase(
            loadBalancesActions.fail,
            (state, {payload: error}) => ({
                ...state,
                balances: createEntity(state.balances.data, false, error)
            })
        );

        builder.addCase(
            addPendingSwapTransactionActions.submit,
            (state, {payload}) => ({
                ...state,
                pendingSwapTransaction: createEntity(payload, true)
            })
        );
        builder.addCase(addPendingSwapTransactionActions.success, state => ({
            ...state,
            pendingSwapTransaction: createEntity(undefined, false)
        }));
        builder.addCase(
            addPendingSwapTransactionActions.fail,
            (state, {payload: error}) => ({
                ...state,
                pendingSwapTransaction: createEntity(undefined, false, error)
            })
        );

        builder.addCase(loadExchangeRates.submit, state => ({
            ...state,
            exchangeRates: createEntity(state.exchangeRates.data, true)
        }));
        builder.addCase(loadExchangeRates.success, (state, {payload}) => ({
            ...state,
            exchangeRates: createEntity(payload, false)
        }));
        builder.addCase(loadExchangeRates.fail, (state, {payload: error}) => ({
            ...state,
            exchangeRates: createEntity(state.exchangeRates.data, false, error)
        }));
    }
);
