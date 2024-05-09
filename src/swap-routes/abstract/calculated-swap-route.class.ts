import {SwapRouteType} from '../../enums/swap-route-type.enum';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';

export abstract class AbstractCalculatedSwapRoute<T extends SwapRouteType> {
    protected constructor(public type: T) {}

    public abstract getRoute(): RouteStepWithCalculation[];
}
