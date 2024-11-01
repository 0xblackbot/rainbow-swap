import {createAction} from '@reduxjs/toolkit';

import {TaskTypeEnum} from '../../enums/task-type.enum';
import {BalancesRecord} from '../../types/balances-record.type';
import {GetClaimRewardsParams} from '../../types/get-claim-rewards.type';
import {GetUserAuthParams} from '../../types/get-user-auth.type';
import {
    GetWalletDataParams,
    WalletDataResponse
} from '../../types/get-wallet-data.type';
import {SwapHistoryData} from '../interfaces/swap-history-data.interface';
import {createActions} from '../utils/create-actions';

export const loadBalancesActions = createActions<string, BalancesRecord>(
    'wallet/LOAD_BALANCES'
);

export const loadUserAuthActions = createActions<GetUserAuthParams, boolean>(
    'wallet/LOAD_USER_AUTH'
);

export const loadWalletDataActions = createActions<
    GetWalletDataParams,
    WalletDataResponse
>('wallet/LOAD_WALLET_DATA');

export const checkTaskActions = createActions<
    {taskType: TaskTypeEnum; walletAddress?: string},
    {taskType: TaskTypeEnum; data: number},
    {taskType: TaskTypeEnum; error: string}
>('wallet/CHECK_TASK');

export const claimRewardsActions = createActions<
    GetClaimRewardsParams,
    boolean
>('wallet/CLAIM_REWARDS');

export const setPendingSwapAction = createAction<
    {bocHash: string; expectedMessageCount: number} | undefined
>('wallet/SET_PENDING_SWAP');

export const setPendingSwapHistoryDataAction = createAction<SwapHistoryData>(
    'wallet/SET_PENDING_SWAP_HISTORY_DATA'
);
