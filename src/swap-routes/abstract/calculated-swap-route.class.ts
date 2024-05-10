import {Address} from '@ton/core';

import {SwapRouteType} from '../../enums/swap-route-type.enum';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {Message} from '../../types/message.type';

export abstract class AbstractCalculatedSwapRoute<T extends SwapRouteType> {
    protected constructor(public type: T) {}

    public abstract getRoute(): RouteStepWithCalculation[];

    public abstract getMessage(senderAddress: Address): Promise<Message>;
}
