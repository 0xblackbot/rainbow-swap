import {Asset, RouteStepWithCalculation} from 'rainbow-swap-sdk';

import {SwapInfo} from '../../../../interfaces/swap-info.interface';

export interface SwapDetailsHeaderProps {
    inputError: string | undefined;
    inputAsset: Asset;
    outputAsset: Asset;
    routes: RouteStepWithCalculation[][];
    swapInfo: SwapInfo;
}
