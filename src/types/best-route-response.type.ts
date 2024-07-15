import {CalculatedSwapRoute} from 'rainbow-swap-sdk';

export type BestRouteResponse = {
    bestRoute: CalculatedSwapRoute[];
    priceImprovement: number;
};
