import {BestRouteResponse} from 'rainbow-swap-sdk';

import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface SwapRoutesState {
    bestRouteResponse: LoadableEntityState<BestRouteResponse>;
    lastRequestId?: string;
}

export const emptyBestRouteResponse: BestRouteResponse = {
    bestRoute: [],
    displayData: {
        inputAssetAmount: 0,
        inputAssetUsdAmount: 0,
        outputAssetAmount: 0,
        outputAssetUsdAmount: 0,
        minOutputAssetAmount: 0,
        exchangeRate: 0,
        maxSlippage: 0,
        routingFeePercent: 0,
        priceImprovementPercent: 0,
        roughGasFee: 0,
        roughGasUsdFee: 0
    },
    swapMessages: [],
    messageCount: 0
};

export const swapRouteInitialState: SwapRoutesState = {
    bestRouteResponse: createEntity(emptyBestRouteResponse),
    lastRequestId: undefined
};
