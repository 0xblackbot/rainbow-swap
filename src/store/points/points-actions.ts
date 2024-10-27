import {TaskTypeEnum} from '../../enums/task-type.enum';
import {GetClaimRewardsParams} from '../../types/get-claim-rewards.type';
import {GetUserAuthParams} from '../../types/get-user-auth.type';
import {
    GetWalletPointsParams,
    WalletPointsResponse
} from '../../types/get-wallet-points.type';
import {createActions} from '../utils/create-actions';

export const loadUserAuthActions = createActions<GetUserAuthParams, boolean>(
    'points/LOAD_USER_AUTH'
);

export const loadWalletPointsActions = createActions<
    GetWalletPointsParams,
    WalletPointsResponse
>('points/LOAD_WALLET_POINTS');

export const checkTaskActions = createActions<
    {taskType: TaskTypeEnum; walletAddress?: string},
    {taskType: TaskTypeEnum; data: number},
    {taskType: TaskTypeEnum; error: string}
>('points/CHECK_TASK');

export const claimRewardsActions = createActions<
    GetClaimRewardsParams,
    boolean
>('points/CLAIM_REWARDS');
