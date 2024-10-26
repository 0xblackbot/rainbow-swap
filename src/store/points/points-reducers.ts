import {createReducer} from '@reduxjs/toolkit';

import {checkTaskActions, loadWalletPointsActions} from './points-actions';
import {pointsInitialState, PointsState, TasksState} from './points-state';
import {createEntity} from '../utils/create-entity';

export const pointsReducers = createReducer<PointsState>(
    pointsInitialState,
    builder => {
        builder.addCase(loadWalletPointsActions.submit, state => {
            const tasksState: TasksState = {};

            for (const [key, value] of Object.entries(state.tasksState)) {
                tasksState[key] = createEntity(value.data, true);
            }

            return {
                ...state,
                walletPoints: createEntity(state.walletPoints.data, true),
                tasksState
            };
        });
        builder.addCase(loadWalletPointsActions.success, (state, {payload}) => {
            const tasksState: TasksState = {};

            for (const [key, value] of Object.entries(payload.tasksState)) {
                tasksState[key] = createEntity(value, false);
            }

            return {
                ...state,
                walletPoints: createEntity(payload, false),
                tasksState
            };
        });
        builder.addCase(loadWalletPointsActions.fail, (state, {payload}) => {
            const tasksState: TasksState = {};

            for (const [key, value] of Object.entries(state.tasksState)) {
                tasksState[key] = createEntity(value.data, false, payload);
            }

            return {
                ...state,
                walletPoints: createEntity(
                    state.walletPoints.data,
                    false,
                    payload
                ),
                tasksState
            };
        });

        builder.addCase(checkTaskActions.submit, (state, {payload}) => ({
            ...state,
            tasksState: {
                ...state.tasksState,
                [payload.taskType]: createEntity(
                    state.tasksState[payload.taskType]?.data ?? 0,
                    true
                )
            }
        }));
        builder.addCase(checkTaskActions.success, (state, {payload}) => ({
            ...state,
            tasksState: {
                ...state.tasksState,
                [payload.taskType]: createEntity(payload.data, false)
            }
        }));
        builder.addCase(checkTaskActions.fail, (state, {payload}) => ({
            ...state,
            tasksState: {
                ...state.tasksState,
                [payload.taskType]: createEntity(
                    state.tasksState[payload.taskType]?.data ?? 0,
                    false,
                    payload.error
                )
            }
        }));
    }
);
