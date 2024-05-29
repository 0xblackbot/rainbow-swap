import {createReducer} from '@reduxjs/toolkit';

import {
    addPendingSwapTransactionActions,
    checkIsRainbowWalletActiveActions,
    loadBalancesActions
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

        builder.addCase(checkIsRainbowWalletActiveActions.submit, state => ({
            ...state,
            isRainbowWalletActive: createEntity(
                state.isRainbowWalletActive.data,
                true
            )
        }));
        builder.addCase(
            checkIsRainbowWalletActiveActions.success,
            (state, {payload}) => ({
                ...state,
                isRainbowWalletActive: createEntity(payload, false)
            })
        );
        builder.addCase(
            checkIsRainbowWalletActiveActions.fail,
            (state, {payload: error}) => ({
                ...state,
                isRainbowWalletActive: createEntity(false, false, error)
            })
        );
    }
);
