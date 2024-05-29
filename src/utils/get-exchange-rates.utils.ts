import {getUsdExchangeRate} from './get-usd-value.utils';
import {AssetsRecord} from '../types/assets-record.type';

export const getExchangeRates = (tonPrice: number, assets: AssetsRecord) => {
    const assetsWithExchangeRates = {...assets};
    for (const asset of Object.values(assetsWithExchangeRates)) {
        asset.exchangeRate = getUsdExchangeRate(tonPrice, asset).toString();
    }

    return assetsWithExchangeRates;
};
