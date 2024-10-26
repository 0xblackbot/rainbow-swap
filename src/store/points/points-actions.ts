import {TaskTypeEnum} from '../../enums/task-type.enum';
import {GetClaimRewardsParams} from '../../types/get-claim-rewards.type';
import {
    GetWalletPointsParams,
    WalletPointsResponse
} from '../../types/get-wallet-points.type';
import {createActions} from '../utils/create-actions';

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
