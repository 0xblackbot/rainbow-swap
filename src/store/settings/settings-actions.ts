import {createAction} from '@reduxjs/toolkit';

export const setSlippageToleranceAction = createAction<string>(
    'settings/SET_SLIPPAGE_TOLERANCE'
);
