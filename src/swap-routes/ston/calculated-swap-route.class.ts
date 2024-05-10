import {Address} from '@ton/core';

import {ston_getTransferParams} from './transfer-params.utils';
import {SwapRouteType} from '../../enums/swap-route-type.enum';
import {GAS_AMOUNT} from '../../globals';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {parseRouteStepWithCalculation} from '../../utils/route-step-with-calculation.utils';
import {
    getQueryId,
    transferParamsToMessage
} from '../../utils/transfer-params.utils';
import {AbstractCalculatedSwapRoute} from '../abstract/calculated-swap-route.class';

export class StonCalculatedSwapRoute extends AbstractCalculatedSwapRoute<SwapRouteType.Ston> {
    constructor(private routeStep: RouteStepWithCalculation) {
        super(SwapRouteType.Ston);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromParsedJson(value: any) {
        const parsedRouteStep = parseRouteStepWithCalculation(value.routeStep);

        return new StonCalculatedSwapRoute(parsedRouteStep);
    }

    public getRoute = () => [this.routeStep];

    async getMessage(senderAddress: Address) {
        const transferParams = await ston_getTransferParams(
            this.routeStep,
            getQueryId(),
            GAS_AMOUNT,
            senderAddress,
            senderAddress,
            senderAddress,
            true
        );

        return transferParamsToMessage(transferParams);
    }
}
