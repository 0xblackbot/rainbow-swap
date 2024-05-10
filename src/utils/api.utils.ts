import {parseCalculatedSwapRoute} from './calculated-swap-route.utils';
import {API} from '../globals';
import {CalculatedSwapRoute} from '../types/calculated-swap-route.type';

export const getBestSwapRoute = async (
    inputAssetAmount: bigint,
    inputAssetAddress: string,
    outputAssetAddress: string
): Promise<CalculatedSwapRoute[]> =>
    API.get<string[]>('/best-route', {
        params: {
            inputAssetAmount: inputAssetAmount.toString(),
            inputAssetAddress,
            outputAssetAddress
        }
    })
        .then(response => response.data.map(parseCalculatedSwapRoute))
        .catch(error => {
            console.log('Error while loading /best-route', error);

            return [];
        });
