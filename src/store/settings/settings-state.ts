import {RiskTolerance} from '../../enums/risk-tolerance.enum';
import {Theme} from '../../enums/theme.enum';

export interface SettingsState {
    maxSlippage: string;
    riskTolerance: RiskTolerance;
    theme: Theme;
}

export const settingsInitialState: SettingsState = {
    maxSlippage: '5.00',
    riskTolerance: RiskTolerance.Normal,
    theme: Theme.Dark
};
