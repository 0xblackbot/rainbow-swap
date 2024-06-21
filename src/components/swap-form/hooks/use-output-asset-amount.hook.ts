import {useMemo} from 'react';

import {RouteStepWithCalculation} from '../../../interfaces/route-step-with-calculation.interface.ts';
import {fromNano} from '../../../utils/big-int.utils.ts';
import {getRouteOutputAssetAmount} from '../../../utils/route-step-with-calculation.utils.ts';

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
