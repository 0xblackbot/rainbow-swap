import {API} from '../globals';
import {GetClaimRewardsParams} from '../types/get-claim-rewards.type';
import {GetTaskCheckParams} from '../types/get-task-check.type';
import {GetUserAuthParams} from '../types/get-user-auth.type';
import {
    GetWalletPointsParams,
    WalletPointsResponse
} from '../types/get-wallet-points.type';

export const getUserAuth = (params: GetUserAuthParams) =>
    API.get<boolean>('/user-auth', {params}).then(response => response.data);

export const getWalletPoints = (params: GetWalletPointsParams) =>
    API.get<WalletPointsResponse>('/wallet-points', {params}).then(
        response => response.data
    );

export const getTaskCheck = (params: GetTaskCheckParams) =>
    API.get<number>('/task-check', {params}).then(response => response.data);

export const getClaimRewards = (params: GetClaimRewardsParams) =>
    API.get<boolean>('/claim-rewards', {params}).then(
        response => response.data
    );
