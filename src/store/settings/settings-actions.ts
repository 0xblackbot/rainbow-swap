import {createAction} from '@reduxjs/toolkit';

import {RiskTolerance} from '../../enums/risk-tolerance.enum';

export const setMaxSlippageAction = createAction<string>(
    'settings/SET_MAX_SLIPPAGE'
);

export const setRiskToleranceAction = createAction<RiskTolerance>(
    'settings/SET_RISK_TOLERANCE'
);
