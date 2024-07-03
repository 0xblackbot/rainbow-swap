import {CalculatedSwapRoute} from '../swap-routes/shared/calculated-swap-route.type';

export type BestRouteResponse =
    | {
          bestRoute: CalculatedSwapRoute[];
          priceImprovement: number;
      }
    | CalculatedSwapRoute[];
