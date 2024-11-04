import {Asset} from 'rainbow-swap-sdk';

export interface SwapDetailsHeaderProps {
    inputError: string | undefined;
    inputAsset: Asset;
    outputAsset: Asset;
    routesLength: number;
}
