import {SwapRouteType} from '../../enums/swap-route-type.enum';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {parseRouteStepWithCalculation} from '../../utils/route-step-with-calculation.utils';
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

    getRoute(): RouteStepWithCalculation[] {
        return this.route;
    }
}
