import {Explorer} from '../../enums/explorer.enum';
import {RiskTolerance} from '../../enums/risk-tolerance.enum';
import {Theme} from '../../enums/theme.enum';

export interface SettingsState {
    maxSlippage: string;
    riskTolerance: RiskTolerance;
    maxSplits: number;
    theme: Theme;
    explorer: Explorer;
}

export const settingsInitialState: SettingsState = {
    maxSlippage: '3.00',
    riskTolerance: RiskTolerance.Normal,
    maxSplits: 4,
    theme: Theme.Dark,
    explorer: Explorer.Tonviewer
};
