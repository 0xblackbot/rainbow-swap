import {RouteStep} from './route-step.interface';

export interface RouteStepWithCalculation extends RouteStep {
    inputAssetAmount: string;
    outputAssetAmount: string;
}
