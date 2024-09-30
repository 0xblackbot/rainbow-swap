import {CalculatedSwapRoute} from 'rainbow-swap-sdk';

import {Message} from '../../types/message.type';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface SwapRoutesState {
    batch: LoadableEntityState<CalculatedSwapRoute[]>;
    priceImprovement: number;
    swapMessages: Message[];
    lastRequestId?: string;
}

export const swapRouteInitialState: SwapRoutesState = {
    batch: createEntity([]),
    priceImprovement: 0,
    swapMessages: [],
    lastRequestId: undefined
};
