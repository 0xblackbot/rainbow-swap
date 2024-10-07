import {BestRouteResponse} from 'rainbow-swap-sdk';

import {RiskTolerance} from '../../enums/risk-tolerance.enum';
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
        riskTolerance: RiskTolerance;
    } & PayloadWithRequest,
    BestRouteResponse & PayloadWithRequest,
    {error: string} & PayloadWithRequest
>('swap-route/LOAD_SWAP_ROUTES');
