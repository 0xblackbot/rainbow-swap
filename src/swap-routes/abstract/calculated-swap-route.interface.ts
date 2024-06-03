import {SwapRouteType} from '../../enums/swap-route-type.enum';

export interface AbstractCalculatedSwapRoute<T extends SwapRouteType> {
    type: T;
    tonRoughFee: string;
}
