import {Address} from '@ton/core';

import {dedust_getTransferParams} from './transfer-params.utils';
import {SwapRouteType} from '../../enums/swap-route-type.enum';
import {GAS_AMOUNT} from '../../globals';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {parseRouteStepWithCalculation} from '../../utils/route-step-with-calculation.utils';
import {
    getQueryId,
    transferParamsToMessage
} from '../../utils/transfer-params.utils';
import {AbstractCalculatedSwapRoute} from '../abstract/calculated-swap-route.class';

export class DeDustCalculatedSwapRoute extends AbstractCalculatedSwapRoute<SwapRouteType.DeDust> {
    constructor(private route: RouteStepWithCalculation[]) {
        super(SwapRouteType.DeDust);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromParsedJson(value: any) {
        const parsedRoute = value.route.map(parseRouteStepWithCalculation);

        return new DeDustCalculatedSwapRoute(parsedRoute);
    }

    getRoute() {
        return this.route;
    }

    async getMessage(senderAddress: Address) {
        const transferParams = await dedust_getTransferParams(
            this.route,
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
