import {createActions} from '../utils/create-actions.ts';

export const setSlippageToleranceActions = createActions<string, string>(
    'settings/SET_SLIPPAGE_TOLERANCE_ACTIONS'
);
