import {
    EMPTY_TRADING_COMPETITION_DATA,
    TradingCompetitionDataResponse
} from '../../types/get-trading-competition-data.type';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface TradingCompetitionState {
    data: LoadableEntityState<TradingCompetitionDataResponse>;
}

export const tradingCompetitionInitialState: TradingCompetitionState = {
    data: createEntity(EMPTY_TRADING_COMPETITION_DATA)
};
