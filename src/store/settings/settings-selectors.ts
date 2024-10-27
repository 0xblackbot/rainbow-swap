import {useSelector} from '../index';

export const useMaxSlippageSelector = () =>
    useSelector(({settings}) => settings.maxSlippage);

export const useRiskToleranceSelector = () =>
    useSelector(({settings}) => settings.riskTolerance);

export const useThemeSelector = () =>
    useSelector(({settings}) => settings.theme);

export const useExplorerSelector = () =>
    useSelector(({settings}) => settings.explorer);
