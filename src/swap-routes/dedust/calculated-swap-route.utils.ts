import {DeDustCalculatedSwapRoute} from './calculated-swap-route.interface.ts';

export const dedust_mapSwapRouteToRoute = (
    swapRoute: DeDustCalculatedSwapRoute
) => swapRoute.route;
