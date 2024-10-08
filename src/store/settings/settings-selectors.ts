import {useSelector} from '../index';

export const useMaxSlippageSelector = () =>
    useSelector(({settings}) => settings.maxSlippage);

export const useRiskToleranceSelector = () =>
    useSelector(({settings}) => settings.riskTolerance);
