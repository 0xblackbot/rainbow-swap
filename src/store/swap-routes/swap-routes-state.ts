import {CalculatedSwapRoute} from 'rainbow-swap-sdk';

import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface SwapRoutesState {
    batch: LoadableEntityState<CalculatedSwapRoute[]>;
    priceImprovement: number;
    lastRequestId?: string;
}

export const swapRouteInitialState: SwapRoutesState = {
    batch: createEntity([]),
    priceImprovement: 0,
    lastRequestId: undefined
};
