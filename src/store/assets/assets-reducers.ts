import {createReducer} from '@reduxjs/toolkit';
import {AssetsRecord} from 'rainbow-swap-sdk';

import {loadAssetsListActions} from './assets-actions';
import {assetsInitialState, AssetsState} from './assets-state';
import {createEntity} from '../utils/create-entity';

export const assetsReducers = createReducer<AssetsState>(
    assetsInitialState,
    builder => {
        builder.addCase(loadAssetsListActions.submit, (state, {payload}) => ({
            ...state,
            list: createEntity(state.list.data, true),
            lastRequestId: payload.requestId
        }));
        builder.addCase(loadAssetsListActions.success, (state, {payload}) => {
            const newRecordData: AssetsRecord = {};

            for (const asset of payload.list) {
                newRecordData[asset.address] = asset;
            }

            return {
                ...state,
                list: createEntity(payload.list, false),
                record: {
                    ...state.record,
                    ...newRecordData
                },
                lastRequestId:
                    state.lastRequestId === payload.requestId
                        ? undefined
                        : state.lastRequestId
            };
        });
        builder.addCase(loadAssetsListActions.fail, (state, {payload}) => ({
            ...state,
            list: createEntity(state.list.data, false, payload.error),
            lastRequestId:
                state.lastRequestId === payload.requestId
                    ? undefined
                    : state.lastRequestId
        }));
    }
);
