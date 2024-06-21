import {CalculatedSwapRoute} from './calculated-swap-route.type';
import {SwapRouteType} from '../../enums/swap-route-type.enum';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {dedust_mapSwapRouteToRoute} from '../dedust/calculated-swap-route.utils';
import {rainbow_mapSwapRouteToRoute} from '../rainbow/calculated-swap-route.utils';
import {ston_mapSwapRouteToRoute} from '../ston/calculated-swap-route.utils';

export const mapSwapRouteToRoute = (
    swapRoute: CalculatedSwapRoute
): RouteStepWithCalculation[] => {
    if (swapRoute.type === SwapRouteType.DeDust) {
        return dedust_mapSwapRouteToRoute(swapRoute);
    }
    if (swapRoute.type === SwapRouteType.Ston) {
        return ston_mapSwapRouteToRoute(swapRoute);
    }

    return rainbow_mapSwapRouteToRoute(swapRoute);
};
