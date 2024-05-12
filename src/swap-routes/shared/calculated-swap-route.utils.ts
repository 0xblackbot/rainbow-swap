import {CalculatedSwapRoute} from './calculated-swap-route.type.ts';
import {SwapRouteType} from '../../enums/swap-route-type.enum.ts';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface.ts';
import {dedust_mapSwapRouteToRoute} from '../dedust/calculated-swap-route.utils.ts';
import {rainbow_mapSwapRouteToRoute} from '../rainbow/calculated-swap-route.utils.ts';
import {ston_mapSwapRouteToRoute} from '../ston/calculated-swap-route.utils.ts';

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
