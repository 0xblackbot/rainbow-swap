import {createReducer} from '@reduxjs/toolkit';

import {
    addTapActions,
    checkPartnerTaskActions,
    checkTelegramChannelTaskActions,
    checkXChannelTaskActions,
    closePointsModal,
    loadPointsActions,
    openPointsModal
} from './points-actions';
import {pointsInitialState, PointsState} from './points-state';
import {PartnerTasksKeyRecord} from '../../enums/task-type.enum';
import {LoadableEntityState} from '../types';
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

        builder.addCase(loadPointsActions.submit, state => {
            const partners: Record<string, LoadableEntityState<number>> = {};

            for (const [key, value] of Object.entries(state.partners)) {
                partners[key] = createEntity(value.data, true);
            }

            return {
                ...state,
                localTapTap: 0,
                tapTap: createEntity(state.tapTap.data, true),
                referral: createEntity(state.referral.data, true),
                telegramChannel: createEntity(state.telegramChannel.data, true),
                xChannel: createEntity(state.xChannel.data, true),
                partners
            };
        });
        builder.addCase(loadPointsActions.success, (state, {payload}) => {
            const partners: Record<string, LoadableEntityState<number>> = {};

            for (const [key, value] of Object.entries(
                payload.torchFinance ?? {}
            )) {
                partners[key] = createEntity(value, false);
            }

            return {
                ...state,
                refHash: payload.refHash,
                tapTap: createEntity(payload.tapTap, false),
                referral: createEntity(payload.referral, false),
                telegramChannel: createEntity(payload.telegramChannel, false),
                xChannel: createEntity(payload.xChannel, false),
                partners
            };
        });
        builder.addCase(loadPointsActions.fail, (state, {payload: error}) => {
            const partners: Record<string, LoadableEntityState<number>> = {};

            for (const [key, value] of Object.entries(state.partners)) {
                partners[key] = createEntity(value.data, false, error);
            }

            return {
                ...state,
                tapTap: createEntity(state.tapTap.data, false, error),
                referral: createEntity(state.referral.data, false, error),
                telegramChannel: createEntity(
                    state.telegramChannel.data,
                    false,
                    error
                ),
                xChannel: createEntity(state.xChannel.data, false, error),
                partners
            };
        });

        builder.addCase(addTapActions.submit, state => ({
            ...state,
            localTapTap: state.localTapTap + 1
        }));

        builder.addCase(checkTelegramChannelTaskActions.submit, state => ({
            ...state,
            telegramChannel: createEntity(state.telegramChannel.data, true)
        }));
        builder.addCase(
            checkTelegramChannelTaskActions.success,
            (state, {payload}) => ({
                ...state,
                telegramChannel: createEntity(payload, false)
            })
        );
        builder.addCase(
            checkTelegramChannelTaskActions.fail,
            (state, {payload: error}) => ({
                ...state,
                telegramChannel: createEntity(
                    state.telegramChannel.data,
                    false,
                    error
                )
            })
        );

        builder.addCase(checkXChannelTaskActions.submit, state => ({
            ...state,
            xChannel: createEntity(state.xChannel.data, true)
        }));
        builder.addCase(
            checkXChannelTaskActions.success,
            (state, {payload}) => ({
                ...state,
                xChannel: createEntity(payload, false)
            })
        );
        builder.addCase(
            checkXChannelTaskActions.fail,
            (state, {payload: error}) => ({
                ...state,
                xChannel: createEntity(state.xChannel.data, false, error)
            })
        );

        builder.addCase(checkPartnerTaskActions.submit, (state, {payload}) => {
            const taskKey = PartnerTasksKeyRecord[payload];

            return {
                ...state,
                partners: {
                    ...state.partners,
                    [taskKey]: createEntity(
                        state.partners[taskKey]?.data ?? 0,
                        true
                    )
                }
            };
        });
        builder.addCase(checkPartnerTaskActions.success, (state, {payload}) => {
            const taskKey = PartnerTasksKeyRecord[payload.taskType];

            return {
                ...state,
                partners: {
                    ...state.partners,
                    [taskKey]: createEntity(payload.data, false)
                }
            };
        });
        builder.addCase(checkPartnerTaskActions.fail, (state, {payload}) => {
            const taskKey = PartnerTasksKeyRecord[payload.taskType];

            return {
                ...state,
                partners: {
                    ...state.partners,
                    [taskKey]: createEntity(
                        state.partners[taskKey]?.data ?? 0,
                        false,
                        payload.error
                    )
                }
            };
        });
    }
);
