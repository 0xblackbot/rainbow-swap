import {useSelector} from '../index';
import {settingsInitialState} from './settings-state';

export const useMaxSlippageSelector = () =>
    useSelector(({settings}) => settings.maxSlippage);

export const useRiskToleranceSelector = () =>
    useSelector(({settings}) => settings.riskTolerance);

export const useMaxSplitsSelector = () =>
    useSelector(({settings}) => settings.maxSplits);

export const useDisabledDexGroupsSelector = () =>
    useSelector(
        ({settings}) =>
            settings.disabledDexGroups ?? settingsInitialState.disabledDexGroups
    );

export const useThemeSelector = () =>
    useSelector(({settings}) => settings.theme);

export const useExplorerSelector = () =>
    useSelector(({settings}) => settings.explorer);
