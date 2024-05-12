import {parseCalculatedSwapRoute} from './calculated-swap-route.utils';
import {DEFAULT_ASSETS_LIST} from '../data/default-asset-list';
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

export const getAssetsList = async () =>
    API.get('/assets')
        .then(response => response.data)
        .catch(error => {
            console.log('Error while loading /assets', error);

            return DEFAULT_ASSETS_LIST;
        });
