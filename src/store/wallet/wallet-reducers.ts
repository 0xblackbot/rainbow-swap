import {createReducer} from '@reduxjs/toolkit';

import {
    loadBalancesActions,
    setPendingSwapAction,
    setPendingSwapProgressAction
} from './wallet-actions';
import {walletInitialState, WalletState} from './wallet-state';
import {createEntity} from '../utils/create-entity';

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

        builder.addCase(setPendingSwapAction, (state, {payload}) => ({
            ...state,
            pendingSwap: {
                ...state.pendingSwap,
                bocHash: payload?.bocHash ?? undefined,
                expectedMessageCount: payload?.expectedMessageCount ?? 0
            }
        }));

        builder.addCase(setPendingSwapProgressAction, (state, {payload}) => ({
            ...state,
            pendingSwap: {
                ...state.pendingSwap,
                parsedTrace: payload.parsedTrace,
                result: payload.onchain
            }
        }));
    }
);
