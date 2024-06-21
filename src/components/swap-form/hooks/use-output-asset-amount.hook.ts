import {useMemo} from 'react';

import {RouteStepWithCalculation} from '../../../interfaces/route-step-with-calculation.interface';
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
