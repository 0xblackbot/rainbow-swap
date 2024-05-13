import {DeDustCalculatedSwapRoute} from '../dedust/calculated-swap-route.interface.ts';
import {RainbowCalculatedSwapRoute} from '../rainbow/calculated-swap-route.interface.ts';
import {StonCalculatedSwapRoute} from '../ston/calculated-swap-route.interface.ts';

export type CalculatedSwapRoute =
    | DeDustCalculatedSwapRoute
    | StonCalculatedSwapRoute
    | RainbowCalculatedSwapRoute;
