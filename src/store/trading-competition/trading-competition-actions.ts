import {
    GetTradingCompetitionDataParams,
    TradingCompetitionDataResponse
} from '../../types/get-trading-competition-data.type';
import {createActions} from '../utils/create-actions';

export const loadTradingCompetitionDataActions = createActions<
    GetTradingCompetitionDataParams,
    TradingCompetitionDataResponse
>('tradingCompetition/LOAD_TRADING_COMPETITION_DATA');
