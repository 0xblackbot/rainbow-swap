import {RiskTolerance} from '../../enums/risk-tolerance.enum';

export interface SettingsState {
    maxSlippage: string;
    riskTolerance: RiskTolerance;
}

export const settingsInitialState: SettingsState = {
    maxSlippage: '5.00',
    riskTolerance: RiskTolerance.Normal
};
