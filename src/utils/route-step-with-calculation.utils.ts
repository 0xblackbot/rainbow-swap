import {RouteStepWithCalculation} from '../interfaces/route-step-with-calculation.interface.ts';

export const getRouteInputStep = (route: RouteStepWithCalculation[]) => {
    if (route.length > 0) {
        return route[0];
    }

    return undefined;
};

export const getRouteOutputStep = (route: RouteStepWithCalculation[]) => {
    if (route.length > 0) {
        return route[route.length - 1];
    }

    return undefined;
};

export const getRouteInputAssetAmount = (route: RouteStepWithCalculation[]) =>
    BigInt(getRouteInputStep(route)?.inputAssetAmount ?? 0);

export const getRouteOutputAssetAmount = (route: RouteStepWithCalculation[]) =>
    BigInt(getRouteOutputStep(route)?.outputAssetAmount ?? 0);
