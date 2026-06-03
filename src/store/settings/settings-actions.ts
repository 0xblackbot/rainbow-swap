import {createAction} from '@reduxjs/toolkit';
import {DexGroupIdEnum} from 'rainbow-swap-sdk';

import {Explorer} from '../../enums/explorer.enum';
import {RiskTolerance} from '../../enums/risk-tolerance.enum';
import {Theme} from '../../enums/theme.enum';

export const setMaxSlippageAction = createAction<string>(
    'settings/SET_MAX_SLIPPAGE'
);

export const setRiskToleranceAction = createAction<RiskTolerance>(
    'settings/SET_RISK_TOLERANCE'
);

export const setMaxSplitsAction = createAction<number>(
    'settings/SET_MAX_SPLITS'
);

export const toggleDisabledDexGroupAction = createAction<DexGroupIdEnum>(
    'settings/TOGGLE_DISABLED_DEX_GROUP'
);

export const enableAllDexGroupsAction = createAction(
    'settings/ENABLE_ALL_DEX_GROUPS'
);

export const setThemeAction = createAction<Theme>('settings/SET_THEME');

export const setExplorerAction = createAction<Explorer>(
    'settings/SET_EXPLORER'
);
