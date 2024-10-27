import {createAction} from '@reduxjs/toolkit';

import {RiskTolerance} from '../../enums/risk-tolerance.enum';
import {Theme} from '../../enums/theme.enum';

export const setMaxSlippageAction = createAction<string>(
    'settings/SET_MAX_SLIPPAGE'
);

export const setRiskToleranceAction = createAction<RiskTolerance>(
    'settings/SET_RISK_TOLERANCE'
);

export const setThemeAction = createAction<Theme>('settings/SET_THEME');
