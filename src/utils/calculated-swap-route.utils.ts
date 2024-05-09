import {SwapRouteType} from '../enums/swap-route-type.enum';
import {DeDustCalculatedSwapRoute} from '../swap-routes/dedust/calculated-swap-route.class';
import {RainbowCalculatedSwapRoute} from '../swap-routes/rainbow/calculated-swap-route.class';
import {StonCalculatedSwapRoute} from '../swap-routes/ston/calculated-swap-route.class';
import {CalculatedSwapRoute} from '../types/calculated-swap-route.type';

export const parseCalculatedSwapRoute = (
    serializedObject: string
): CalculatedSwapRoute => {
    const parsedObject = JSON.parse(serializedObject);

    if (parsedObject.type === SwapRouteType.DeDust) {
        return DeDustCalculatedSwapRoute.fromParsedJson(parsedObject);
    } else if (parsedObject.type === SwapRouteType.Ston) {
        return StonCalculatedSwapRoute.fromParsedJson(parsedObject);
    } else if (parsedObject.type === SwapRouteType.Rainbow) {
        return RainbowCalculatedSwapRoute.fromParsedJson(parsedObject);
    }

    throw new Error(`${parsedObject} parse method not implemented`);
};
