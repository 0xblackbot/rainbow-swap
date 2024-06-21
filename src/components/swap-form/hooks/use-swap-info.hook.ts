import {useMemo} from 'react';

import {RouteStepWithCalculation} from '../../../interfaces/route-step-with-calculation.interface';
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
    useMemo(() => {
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
