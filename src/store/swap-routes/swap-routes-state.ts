import {TransactionInfo} from '../../interfaces/transaction-info.interface.ts';
import {CalculatedSwapRoute} from '../../swap-routes/shared/calculated-swap-route.type.ts';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface SwapRoutesState {
    batch: LoadableEntityState<CalculatedSwapRoute[]>;
    pendingSwapTransaction: LoadableEntityState<TransactionInfo | undefined>;
}

export const swapRouteInitialState: SwapRoutesState = {
    batch: createEntity([]),
    pendingSwapTransaction: createEntity(undefined)
};
