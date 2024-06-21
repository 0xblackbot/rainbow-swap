import {StonCalculatedSwapRoute} from './calculated-swap-route.interface';

export const ston_mapSwapRouteToRoute = (
    swapRoute: StonCalculatedSwapRoute
) => [swapRoute.routeStep];
