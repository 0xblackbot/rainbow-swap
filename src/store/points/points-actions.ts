import {createAction} from '@reduxjs/toolkit';

import {Click} from '../../interfaces/click.interface';
import {
    GetPointsAuthParams,
    PointsAuthResponse
} from '../../types/get-points-auth.type';
import {createActions} from '../utils/create-actions';

export const openPointsModal = createAction('points/OPEN_MODAL');
export const closePointsModal = createAction('points/CLOSE_MODAL');

export const loadPointsActions = createActions<
    GetPointsAuthParams,
    PointsAuthResponse
>('points/LOAD_POINTS');

export const addTapActions = createActions<Click>('points/ADD_TAP');
