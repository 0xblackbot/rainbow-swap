import {RouteStepWithCalculation} from '../interfaces/route-step-with-calculation.interface';

export const parseRouteStepWithCalculation = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routeStep: any
): RouteStepWithCalculation => ({
    dexType: routeStep.dexType,
    dexPairAddress: routeStep.dexPairAddress,
    inputAssetAddress: routeStep.inputAssetAddress,
    outputAssetAddress: routeStep.outputAssetAddress,
    routeDirection: routeStep.routeDirection,
    inputAssetAmount: BigInt(routeStep.inputAssetAmount),
    outputAssetAmount: BigInt(routeStep.outputAssetAmount)
});
