import {createReducer} from '@reduxjs/toolkit';

import {
    addTapActions,
    checkTelegramChannelTaskActions,
    checkTorchFinanceTelegramTaskActions,
    checkTorchFinanceTwitterTaskActions,
    checkXChannelTaskActions,
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
            xChannel: createEntity(state.xChannel.data, true),
            torchFinanceTelegram: createEntity(
                state.torchFinanceTelegram.data,
                true
            ),
            torchFinanceTwitter: createEntity(
                state.torchFinanceTwitter.data,
                true
            )
        }));
        builder.addCase(loadPointsActions.success, (state, {payload}) => ({
            ...state,
            tapTap: createEntity(payload.tapTap, false),
            referral: createEntity(payload.referral, false),
            telegramChannel: createEntity(payload.telegramChannel, false),
            xChannel: createEntity(payload.xChannel, false),
            torchFinanceTelegram: createEntity(
                payload.torchFinance.telegram,
                false
            ),
            torchFinanceTwitter: createEntity(
                payload.torchFinance.twitter,
                false
            )
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
            xChannel: createEntity(state.xChannel.data, false, error),
            torchFinanceTelegram: createEntity(
                state.torchFinanceTelegram.data,
                false,
                error
            ),
            torchFinanceTwitter: createEntity(
                state.torchFinanceTwitter.data,
                false,
                error
            )
        }));

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

        // TorchFinance
        builder.addCase(checkTorchFinanceTelegramTaskActions.submit, state => ({
            ...state,
            torchFinanceTelegram: createEntity(
                state.torchFinanceTelegram.data,
                true
            )
        }));
        builder.addCase(
            checkTorchFinanceTelegramTaskActions.success,
            (state, {payload}) => ({
                ...state,
                torchFinanceTelegram: createEntity(payload, false)
            })
        );
        builder.addCase(
            checkTorchFinanceTelegramTaskActions.fail,
            (state, {payload: error}) => ({
                ...state,
                torchFinanceTelegram: createEntity(
                    state.torchFinanceTelegram.data,
                    false,
                    error
                )
            })
        );

        builder.addCase(checkTorchFinanceTwitterTaskActions.submit, state => ({
            ...state,
            torchFinanceTwitter: createEntity(
                state.torchFinanceTwitter.data,
                true
            )
        }));
        builder.addCase(
            checkTorchFinanceTwitterTaskActions.success,
            (state, {payload}) => ({
                ...state,
                torchFinanceTwitter: createEntity(payload, false)
            })
        );
        builder.addCase(
            checkTorchFinanceTwitterTaskActions.fail,
            (state, {payload: error}) => ({
                ...state,
                torchFinanceTwitter: createEntity(
                    state.torchFinanceTwitter.data,
                    false,
                    error
                )
            })
        );
    }
);
