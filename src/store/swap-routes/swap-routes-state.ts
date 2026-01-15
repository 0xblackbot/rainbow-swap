import {BestRouteResponse} from 'rainbow-swap-sdk';

import {EMPTY_ASSET} from '../../utils/asset.utils';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface SwapRoutesState {
    bestRouteResponse: LoadableEntityState<BestRouteResponse>;
    lastRequestId?: string;
}

export const emptyBestRouteResponse: BestRouteResponse = {
    displayData: {
        inputAsset: EMPTY_ASSET,
        inputAssetAmount: 0,
        inputAssetUsdAmount: 0,
        outputAsset: EMPTY_ASSET,
        outputAssetAmount: 0,
        outputAssetUsdAmount: 0,
        minOutputAssetAmount: 0,
        exchangeRate: 0,
        maxSlippage: 0,
        routingFeePercent: 0,
        priceImprovementPercent: 0,
        priceImpact: 0,
        roughGasFee: 0,
        roughGasUsdFee: 0,
        routes: []
    },
    swapMessages: [],
    messageCount: 0
};

export const swapRouteInitialState: SwapRoutesState = {
    bestRouteResponse: createEntity(emptyBestRouteResponse),
    lastRequestId: undefined
};
