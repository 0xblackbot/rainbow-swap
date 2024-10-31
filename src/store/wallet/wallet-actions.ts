import {createAction} from '@reduxjs/toolkit';

import {BalancesRecord} from '../../types/balances-record.type';
import {SwapProgressResponse} from '../../types/get-swap-progress.type';
import {createActions} from '../utils/create-actions';

export const loadBalancesActions = createActions<string, BalancesRecord>(
    'wallet/LOAD_BALANCES'
);

export const setPendingSwapAction = createAction<
    {bocHash: string; expectedMessageCount: number} | undefined
>('wallet/SET_PENDING_SWAP');

export const setPendingSwapProgressAction = createAction<SwapProgressResponse>(
    'wallet/SET_PENDING_SWAP_PROGRESS'
);
