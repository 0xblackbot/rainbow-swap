import {BestRouteResponse} from 'rainbow-swap-sdk';

import {createActions} from '../utils/create-actions';

interface PayloadWithRequest {
    requestId: string;
}

export const loadSwapRoutesActions = createActions<
    {
        inputAssetAmount: string;
        inputAssetAddress: string;
        outputAssetAddress: string;
        senderAddress: string | undefined;
    } & PayloadWithRequest,
    BestRouteResponse & PayloadWithRequest,
    {error: string} & PayloadWithRequest
>('swap-route/LOAD_SWAP_ROUTES');
