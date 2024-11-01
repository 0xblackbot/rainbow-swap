import {createReducer} from '@reduxjs/toolkit';

import {
    checkTaskActions,
    loadBalancesActions,
    loadWalletDataActions,
    setPendingSwapAction,
    setPendingSwapHistoryDataAction
} from './wallet-actions';
import {TasksState, walletInitialState, WalletState} from './wallet-state';
import {EMPTY_SWAP_HISTORY_DATA} from '../interfaces/swap-history-data.interface';
import {createEntity} from '../utils/create-entity';

export const walletReducers = createReducer<WalletState>(
    walletInitialState,
    builder => {
        builder.addCase(loadBalancesActions.submit, state => ({
            ...state,
            balances: createEntity(state.balances.data, true)
        }));
        builder.addCase(loadBalancesActions.success, (state, {payload}) => ({
            ...state,
            balances: createEntity(payload, false)
        }));
        builder.addCase(
            loadBalancesActions.fail,
            (state, {payload: error}) => ({
                ...state,
                balances: createEntity(state.balances.data, false, error)
            })
        );

        builder.addCase(loadWalletDataActions.submit, state => {
            const tasks: TasksState = {};

            for (const [key, value] of Object.entries(
                state.pointsState.tasks
            )) {
                tasks[key] = createEntity(value.data, true);
            }

            return {
                ...state,
                pointsState: {
                    ...state.pointsState,
                    walletPoints: createEntity(
                        state.pointsState.walletPoints.data,
                        true
                    ),
                    tasks
                },
                swapsState: {
                    ...state.swapsState,
                    history: createEntity(state.swapsState.history.data, true)
                }
            };
        });
        builder.addCase(loadWalletDataActions.success, (state, {payload}) => {
            const tasks: TasksState = {};

            for (const [key, value] of Object.entries(
                payload.pointsState.tasksState
            )) {
                tasks[key] = createEntity(value, false);
            }

            return {
                ...state,
                pointsState: {
                    ...state.pointsState,
                    walletPoints: createEntity(payload.pointsState, false),
                    tasks
                },
                swapsState: {
                    ...state.swapsState,
                    history: createEntity(payload.swapHistory, false)
                }
            };
        });
        builder.addCase(loadWalletDataActions.fail, (state, {payload}) => {
            const tasks: TasksState = {};

            for (const [key, value] of Object.entries(
                state.pointsState.tasks
            )) {
                tasks[key] = createEntity(value.data, false, payload);
            }

            return {
                ...state,
                pointsState: {
                    ...state.pointsState,
                    walletPoints: createEntity(
                        state.pointsState.walletPoints.data,
                        false,
                        payload
                    ),
                    tasks
                },
                swapsState: {
                    ...state.swapsState,
                    history: createEntity(
                        state.swapsState.history.data,
                        false,
                        payload
                    )
                }
            };
        });

        builder.addCase(checkTaskActions.submit, (state, {payload}) => ({
            ...state,
            pointsState: {
                ...state.pointsState,
                tasks: {
                    ...state.pointsState.tasks,
                    [payload.taskType]: createEntity(
                        state.pointsState.tasks[payload.taskType]?.data ?? 0,
                        true
                    )
                }
            }
        }));
        builder.addCase(checkTaskActions.success, (state, {payload}) => ({
            ...state,
            pointsState: {
                ...state.pointsState,
                tasks: {
                    ...state.pointsState.tasks,
                    [payload.taskType]: createEntity(payload.data, false)
                }
            }
        }));
        builder.addCase(checkTaskActions.fail, (state, {payload}) => ({
            ...state,
            pointsState: {
                ...state.pointsState,
                tasks: {
                    ...state.pointsState.tasks,
                    [payload.taskType]: createEntity(
                        state.pointsState.tasks[payload.taskType]?.data ?? 0,
                        false,
                        payload.error
                    )
                }
            }
        }));

        builder.addCase(setPendingSwapAction, (state, {payload}) => {
            const newPendingState: WalletState['swapsState']['pending'] = {
                ...state.swapsState.pending
            };
            if (payload) {
                newPendingState.bocHash = payload.bocHash;
                newPendingState.expectedMessageCount =
                    payload.expectedMessageCount;
            } else {
                newPendingState.bocHash = undefined;
                newPendingState.expectedMessageCount = 0;
                newPendingState.historyData = EMPTY_SWAP_HISTORY_DATA;
            }

            return {
                ...state,
                swapsState: {
                    ...state.swapsState,
                    pending: newPendingState
                }
            };
        });

        builder.addCase(
            setPendingSwapHistoryDataAction,
            (state, {payload}) => ({
                ...state,
                swapsState: {
                    ...state.swapsState,
                    pending: {
                        ...state.swapsState.pending,
                        historyData: payload
                    }
                }
            })
        );
    }
);
