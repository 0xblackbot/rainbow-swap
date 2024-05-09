import {DexTypeEnum} from '../enums/dex-type.enum';
import {RouteDirectionEnum} from '../enums/route-direction.enum';

export interface RouteStep {
    dexType: DexTypeEnum;
    dexPairAddress: string;
    inputAssetAddress: string;
    outputAssetAddress: string;
    routeDirection: RouteDirectionEnum;
}
