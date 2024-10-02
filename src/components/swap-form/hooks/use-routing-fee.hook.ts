import {isDefined} from '@rnw-community/shared';
import {DexTypeEnum, RouteStepWithCalculation} from 'rainbow-swap-sdk';
import {useMemo} from 'react';

import {getRouteInputAssetAmount} from '../../../utils/route-step-with-calculation.utils';

const DEX_PAIRS_WITH_FEE = [DexTypeEnum.Ston, DexTypeEnum.Ston_v2];
const MAX_FEE = 0.1;

export const useRoutingFee = (routes: RouteStepWithCalculation[][]) =>
    useMemo(() => {
        let totalInputAmount = 0n;
        let inputAmountWithFee = 0n;

        for (const route of routes) {
            const inputAmount = getRouteInputAssetAmount(route);
            const stepWithFee = route.find(routeStep =>
                DEX_PAIRS_WITH_FEE.includes(routeStep.dexPair.dexType)
            );

            totalInputAmount += inputAmount;
            if (isDefined(stepWithFee)) {
                inputAmountWithFee += inputAmount;
            }
        }

        if (totalInputAmount === 0n) {
            return 0;
        }

        const fee =
            (MAX_FEE * Number(inputAmountWithFee)) / Number(totalInputAmount);

        return Number(fee?.toFixed(2));
    }, [routes]);
