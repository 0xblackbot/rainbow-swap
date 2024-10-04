import {BestRouteResponse} from 'rainbow-swap-sdk';

import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface SwapRoutesState {
    bestRouteResponse: LoadableEntityState<BestRouteResponse>;
    lastRequestId?: string;
}

export const emptyBestRouteResponse: BestRouteResponse = {
    bestRoute: [],
    priceImprovement: 0,
    routingFee: 0,
    swapMessages: []
};

export const swapRouteInitialState: SwapRoutesState = {
    bestRouteResponse: createEntity(emptyBestRouteResponse),
    lastRequestId: undefined
};
