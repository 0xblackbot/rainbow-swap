import {API} from '../globals';
import {GetTaskCheckParams} from '../types/get-task-check.type';
import {
    GetWalletPointsParams,
    WalletPointsResponse
} from '../types/get-wallet-points.type';

export const getWalletPoints = (params: GetWalletPointsParams) =>
    API.get<WalletPointsResponse>('/wallet-points', {params}).then(
        response => response.data
    );

export const getTaskCheck = (params: GetTaskCheckParams) =>
    API.get<number>('/task-check', {params}).then(response => response.data);
