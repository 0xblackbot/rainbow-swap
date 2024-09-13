import {createAction} from '@reduxjs/toolkit';
import {BestRouteResponse} from 'rainbow-swap-sdk';

import {createActions} from '../utils/create-actions';

export const loadSwapRoutesActions = createActions<
    {
        inputAssetAmount: string;
        inputAssetAddress: string;
        outputAssetAddress: string;
    },
    BestRouteResponse
>('swap-route/LOAD_SWAP_ROUTES');

export const resetSwapRoutes = createAction('swap-route/RESET_SWAP_ROUTE');
