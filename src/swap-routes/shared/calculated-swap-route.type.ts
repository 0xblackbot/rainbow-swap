import {DeDustCalculatedSwapRoute} from '../dedust/calculated-swap-route.interface';
import {RainbowCalculatedSwapRoute} from '../rainbow/calculated-swap-route.interface';
import {StonCalculatedSwapRoute} from '../ston/calculated-swap-route.interface';

export type CalculatedSwapRoute =
    | DeDustCalculatedSwapRoute
    | StonCalculatedSwapRoute
    | RainbowCalculatedSwapRoute;
