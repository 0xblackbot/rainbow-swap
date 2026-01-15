import {useSelector} from '../index';

export const useTradingCompetitionDateSelector = () =>
    useSelector(({tradingCompetition}) => tradingCompetition.data);
