import {BestRouteResponse} from 'rainbow-swap-sdk';

import {RiskTolerance} from '../../enums/risk-tolerance.enum';
import {PayloadWithRequest} from '../interfaces/payload-with-request.interface';
import {createActions} from '../utils/create-actions';

export const loadSwapRoutesActions = createActions<
    {
        inputAssetAmount: string;
        inputAssetAddress: string;
        outputAssetAddress: string;
        senderAddress: string | undefined;
        riskTolerance: RiskTolerance;
        maxSplits: number;
    } & PayloadWithRequest,
    BestRouteResponse & PayloadWithRequest,
    {error: string} & PayloadWithRequest
>('swap-route/LOAD_SWAP_ROUTES');
