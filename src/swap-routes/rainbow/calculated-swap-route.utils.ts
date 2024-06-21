import {RainbowCalculatedSwapRoute} from './calculated-swap-route.interface';

export const rainbow_mapSwapRouteToRoute = (
    swapRoute: RainbowCalculatedSwapRoute
) => [...swapRoute.firstChunk, ...swapRoute.secondChunk];
