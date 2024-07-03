import {BestRouteResponse} from '../../types/best-route-response.type';
import {createActions} from '../utils/create-actions';

export const loadSwapRoutesActions = createActions<
    {
        inputAssetAmount: string;
        inputAssetAddress: string;
        outputAssetAddress: string;
    },
    BestRouteResponse
>('swap-route/LOAD_SWAP_ROUTES');
