import {createReducer} from '@reduxjs/toolkit';

import {loadTradingCompetitionDataActions} from './trading-competition-actions';
import {
    tradingCompetitionInitialState,
    TradingCompetitionState
} from './trading-competition-state';
import {createEntity} from '../utils/create-entity';

export const tradingCompetitionReducers =
    createReducer<TradingCompetitionState>(
        tradingCompetitionInitialState,
        builder => {
            builder.addCase(
                loadTradingCompetitionDataActions.submit,
                state => ({
                    ...state,
                    data: createEntity(state.data.data, true)
                })
            );
            builder.addCase(
                loadTradingCompetitionDataActions.success,
                (state, {payload}) => ({
                    ...state,
                    data: createEntity(payload, false)
                })
            );
            builder.addCase(
                loadTradingCompetitionDataActions.fail,
                (state, {payload: error}) => ({
                    ...state,
                    data: createEntity(state.data.data, false, error)
                })
            );
        }
    );
