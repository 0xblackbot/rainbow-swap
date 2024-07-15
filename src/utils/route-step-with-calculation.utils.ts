import {RouteStepWithCalculation} from '../interfaces/route-step-with-calculation.interface';

export const getRouteInputStep = (route: RouteStepWithCalculation[]) => {
    if (route.length > 0) {
        return route[0];
    }

    return undefined;
};

const getRouteOutputStep = (route: RouteStepWithCalculation[]) => {
    if (route.length > 0) {
        return route[route.length - 1];
    }

    return undefined;
};

const getRouteInputAssetAmount = (route: RouteStepWithCalculation[]) =>
    BigInt(getRouteInputStep(route)?.inputAssetAmount ?? 0);

export const getRouteOutputAssetAmount = (route: RouteStepWithCalculation[]) =>
    BigInt(getRouteOutputStep(route)?.outputAssetAmount ?? 0);

export const getSwapInputAssetAmount = (
    routes: RouteStepWithCalculation[][]
) => {
    let result = 0n;

    for (const route of routes) {
        result += getRouteInputAssetAmount(route);
    }

    return result;
};

export const getSwapOutputAssetAmount = (
    routes: RouteStepWithCalculation[][]
) => {
    let result = 0n;

    for (const route of routes) {
        result += getRouteOutputAssetAmount(route);
    }

    return result;
};
