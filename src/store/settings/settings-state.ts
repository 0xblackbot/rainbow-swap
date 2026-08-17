import {DexGroupIdEnum} from 'rainbow-swap-sdk';

import {Explorer} from '../../enums/explorer.enum';
import {RiskTolerance} from '../../enums/risk-tolerance.enum';
import {Theme} from '../../enums/theme.enum';

export interface SettingsState {
    maxSlippage: string;
    riskTolerance: RiskTolerance;
    maxSplits: number;
    disabledDexGroups: DexGroupIdEnum[];
    theme: Theme;
    explorer: Explorer;
}

export const settingsInitialState: SettingsState = {
    maxSlippage: '0.50',
    riskTolerance: RiskTolerance.Normal,
    maxSplits: 4,
    disabledDexGroups: [],
    theme: Theme.Dark,
    explorer: Explorer.Tonviewer
};
