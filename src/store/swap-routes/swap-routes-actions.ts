import {CalculatedSwapRoute} from '../../swap-routes/shared/calculated-swap-route.type';
import {createActions} from '../utils/create-actions';

export const loadSwapRoutesActions = createActions<
    {
        inputAssetAmount: string;
        inputAssetAddress: string;
        outputAssetAddress: string;
    },
    CalculatedSwapRoute[]
>('swap-route/LOAD_SWAP_ROUTES');
