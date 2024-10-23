import {API} from '../globals';
import {
    GetPointsAuthParams,
    PointsAuthResponse
} from '../types/get-points-auth.type';
import {GetTaskCheckParams} from '../types/get-task-check.type';

export const getPointsAuth = (params: GetPointsAuthParams) =>
    API.get<PointsAuthResponse>('/points-auth', {params}).then(
        response => response.data
    );

export const getTaskCheck = (params: GetTaskCheckParams) =>
    API.get<number>('/task-check', {params}).then(response => response.data);
