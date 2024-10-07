import {Asset, RouteStepWithCalculation} from 'rainbow-swap-sdk';

export interface SwapDetailsHeaderProps {
    inputError: string | undefined;
    inputAsset: Asset;
    outputAsset: Asset;
    routes: RouteStepWithCalculation[][];
}
