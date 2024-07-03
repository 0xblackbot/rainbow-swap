import {CalculatedSwapRoute} from '../../swap-routes/shared/calculated-swap-route.type';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface SwapRoutesState {
    batch: LoadableEntityState<CalculatedSwapRoute[]>;
    priceImprovement: number;
}

export const swapRouteInitialState: SwapRoutesState = {
    batch: createEntity([]),
    priceImprovement: 0
};
