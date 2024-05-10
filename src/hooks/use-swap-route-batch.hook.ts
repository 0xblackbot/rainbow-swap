import {useCallback, useMemo, useState} from 'react';

import {CalculatedSwapRoute} from '../types/calculated-swap-route.type';
import {getBestSwapRoute} from '../utils/api.utils';

export const useSwapRouteBatch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<CalculatedSwapRoute[]>([]);

    const loadData = useCallback(
        async (
            inputAssetAmount: bigint,
            inputAssetAddress: string,
            outputAssetAddress: string
        ) => {
            setIsLoading(true);

            const newSwapRoute = await getBestSwapRoute(
                inputAssetAmount,
                inputAssetAddress,
                outputAssetAddress
            );

            setData(newSwapRoute);
            setIsLoading(false);
        },
        []
    );

    return useMemo(
        () => ({isLoading, data, loadData}),
        [isLoading, data, loadData]
    );
};
