import {API} from '../globals';
import {SwapHistoryData} from '../store/interfaces/swap-history-data.interface';
import {GetClaimRewardsParams} from '../types/get-claim-rewards.type';
import {GetSwapHistoryDataParams} from '../types/get-swap-history-data.type';
import {GetTaskCheckParams} from '../types/get-task-check.type';
import {GetUserAuthParams} from '../types/get-user-auth.type';
import {
    GetWalletDataParams,
    WalletDataResponse
} from '../types/get-wallet-data.type';

export const getUserAuth = (params: GetUserAuthParams) =>
    API.get<boolean>('/user-auth', {params}).then(response => response.data);

export const getWalletData = (params: GetWalletDataParams) =>
    API.get<WalletDataResponse>('/wallet-data', {params}).then(
        response => response.data
    );

export const getTaskCheck = (params: GetTaskCheckParams) =>
    API.get<number>('/task-check', {params}).then(response => response.data);

export const getClaimRewards = (params: GetClaimRewardsParams) =>
    API.get<boolean>('/claim-rewards', {params}).then(
        response => response.data
    );

export const getSwapHistoryData = (params: GetSwapHistoryDataParams) =>
    API.get<SwapHistoryData>('/swap-history-data', {params}).then(
        response => response.data
    );
