import {RouteStepWithCalculation} from 'rainbow-swap-sdk';
import {useMemo} from 'react';

import {fromNano} from '../../../utils/big-int.utils';
import {getRouteOutputAssetAmount} from '../../../utils/route-step-with-calculation.utils';

export const useOutputAssetAmount = (
    routes: RouteStepWithCalculation[][],
    decimals: number
) =>
    useMemo(() => {
        let result = 0n;

        for (const route of routes) {
            result += getRouteOutputAssetAmount(route);
        }

        return result === 0n ? '' : fromNano(result, decimals);
    }, [routes, decimals]);
