import {RainbowCalculatedSwapRoute} from './calculated-swap-route.interface.ts';

export const rainbow_mapSwapRouteToRoute = (
    swapRoute: RainbowCalculatedSwapRoute
) => [...swapRoute.firstChunk, ...swapRoute.secondChunk];
