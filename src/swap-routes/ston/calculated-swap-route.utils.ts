import {StonCalculatedSwapRoute} from './calculated-swap-route.interface.ts';

export const ston_mapSwapRouteToRoute = (
    swapRoute: StonCalculatedSwapRoute
) => [swapRoute.routeStep];
