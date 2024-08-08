import {API} from '../globals';
import {
    GetPointsAuthParams,
    PointsAuthResponse
} from '../types/get-points-auth.type';
import {GetTaskCheckParams} from '../types/get-task-check.type';
import {PostAddTapsParams} from '../types/post-add-taps.type';

export const getPointsAuth = (params: GetPointsAuthParams) =>
    API.get<PointsAuthResponse>('/points-auth', {params}).then(
        response => response.data
    );

export const getTaskCheck = (params: GetTaskCheckParams) =>
    API.get<number>('/task-check', {params}).then(response => response.data);

export const postAddTaps = (params: PostAddTapsParams) =>
    API.post('/add-taps', params);
