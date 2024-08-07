import {createReducer} from '@reduxjs/toolkit';

import {
    addTapActions,
    closePointsModal,
    loadPointsActions,
    openPointsModal
} from './points-actions';
import {pointsInitialState, PointsState} from './points-state';
import {createEntity} from '../utils/create-entity';

export const pointsReducers = createReducer<PointsState>(
    pointsInitialState,
    builder => {
        builder.addCase(openPointsModal, state => ({
            ...state,
            isModalOpen: true
        }));
        builder.addCase(closePointsModal, state => ({
            ...state,
            isModalOpen: false
        }));

        builder.addCase(loadPointsActions.submit, state => ({
            ...state,
            localTapTap: 0,
            tapTap: createEntity(state.tapTap.data, true),
            referral: createEntity(state.referral.data, true),
            telegramChannel: createEntity(state.telegramChannel.data, true),
            xChannel: createEntity(state.xChannel.data, true)
        }));
        builder.addCase(loadPointsActions.success, (state, {payload}) => ({
            ...state,
            tapTap: createEntity(payload.tapTap, false),
            referral: createEntity(payload.referral, false),
            telegramChannel: createEntity(payload.telegramChannel, false),
            xChannel: createEntity(payload.xChannel, false)
        }));
        builder.addCase(loadPointsActions.fail, (state, {payload: error}) => ({
            ...state,
            tapTap: createEntity(state.tapTap.data, false, error),
            referral: createEntity(state.referral.data, false, error),
            telegramChannel: createEntity(
                state.telegramChannel.data,
                false,
                error
            ),
            xChannel: createEntity(state.xChannel.data, false, error)
        }));

        builder.addCase(addTapActions.submit, state => ({
            ...state,
            localTapTap: state.localTapTap + 1
        }));
    }
);
