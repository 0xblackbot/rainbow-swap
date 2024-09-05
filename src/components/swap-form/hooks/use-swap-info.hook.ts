import {RouteStepWithCalculation} from 'rainbow-swap-sdk';
import {useMemo} from 'react';

import {SwapInfo} from '../../../interfaces/swap-info.interface';
import {fromNano} from '../../../utils/big-int.utils';
import {
    getSwapInputAssetAmount,
    getSwapOutputAssetAmount
} from '../../../utils/route-step-with-calculation.utils';

export const useSwapInfo = (
    inputAssetDecimals: number,
    outputAssetDecimals: number,
    slippageTolerance: string,
    routes: RouteStepWithCalculation[][]
) =>
    useMemo<SwapInfo>(() => {
        const nanoInputAssetAmount = getSwapInputAssetAmount(routes);
        const nanoOutputAssetAmount = getSwapOutputAssetAmount(routes);

        const inputAssetAmount = fromNano(
            nanoInputAssetAmount,
            inputAssetDecimals
        );
        const outputAssetAmount = fromNano(
            nanoOutputAssetAmount,
            outputAssetDecimals
        );

        const minOutputAssetAmount =
            (parseFloat(outputAssetAmount) *
                (100 - parseFloat(slippageTolerance))) /
            100;

        const exchangeRate =
            parseFloat(outputAssetAmount) / parseFloat(inputAssetAmount);

        return {
            inputAssetAmount,
            outputAssetAmount,
            minOutputAssetAmount,
            exchangeRate
        };
    }, [inputAssetDecimals, outputAssetDecimals, slippageTolerance, routes]);
