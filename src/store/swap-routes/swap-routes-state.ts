import {CalculatedSwapRoute} from '../../swap-routes/shared/calculated-swap-route.type.ts';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface SwapRoutesState {
    batch: LoadableEntityState<CalculatedSwapRoute[]>;
}

export const swapRouteInitialState: SwapRoutesState = {
    batch: createEntity([])
};
