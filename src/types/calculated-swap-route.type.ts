import {DeDustCalculatedSwapRoute} from '../swap-routes/dedust/calculated-swap-route.class';
import {RainbowCalculatedSwapRoute} from '../swap-routes/rainbow/calculated-swap-route.class';
import {StonCalculatedSwapRoute} from '../swap-routes/ston/calculated-swap-route.class';

export type CalculatedSwapRoute =
    | DeDustCalculatedSwapRoute
    | StonCalculatedSwapRoute
    | RainbowCalculatedSwapRoute;
