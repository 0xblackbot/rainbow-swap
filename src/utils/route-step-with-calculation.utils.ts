import {RouteStepWithCalculation} from 'rainbow-swap-sdk';

const getRouteInputStep = (route: RouteStepWithCalculation[]) => {
    if (route.length > 0) {
        return route[0];
    }

    return undefined;
};

export const getRouteInputAssetAmount = (route: RouteStepWithCalculation[]) =>
    BigInt(getRouteInputStep(route)?.inputAssetAmount ?? 0);

export const getSwapInputAssetAmount = (
    routes: RouteStepWithCalculation[][]
) => {
    let result = 0n;

    for (const route of routes) {
        result += getRouteInputAssetAmount(route);
    }

    return result;
};
