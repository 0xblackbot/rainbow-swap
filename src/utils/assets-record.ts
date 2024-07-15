import {AssetsRecord} from 'rainbow-swap-sdk';

import {getUsdExchangeRate} from './get-usd-value.utils';

export const mapAssetsRecordWithExchangeRate = (
    tonPrice: number,
    assets: AssetsRecord
) => {
    const assetsWithExchangeRates = {...assets};
    for (const asset of Object.values(assetsWithExchangeRates)) {
        asset.exchangeRate = getUsdExchangeRate(tonPrice, asset).toString();
    }

    return assetsWithExchangeRates;
};
