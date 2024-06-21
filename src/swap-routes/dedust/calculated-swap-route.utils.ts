import {DeDustCalculatedSwapRoute} from './calculated-swap-route.interface';

export const dedust_mapSwapRouteToRoute = (
    swapRoute: DeDustCalculatedSwapRoute
) => swapRoute.route;
