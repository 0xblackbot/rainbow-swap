import {Asset} from 'rainbow-swap-sdk';

export interface SwapDetailsHeaderProps {
    inputAsset: Asset;
    outputAsset: Asset;
    routesLength: number;
}
