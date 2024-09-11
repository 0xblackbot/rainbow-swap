import {Asset} from 'rainbow-swap-sdk';

import {TON} from '../../../../../globals';
import {BalancesRecord} from '../../../../../types/balances-record.type';

export const sortAssets = (
    assets: Asset[],
    balances: BalancesRecord
): Asset[] => {
    const ton = assets.find(asset => asset.address === TON);
    const otherAssets = assets.filter(asset => asset.address !== TON);

    const sortedAssets = otherAssets.sort((a, b) => {
        const aBalance = balances[a.address] || '0';
        const bBalance = balances[b.address] || '0';

        const aUsdValue = parseFloat(aBalance) * a.usdExchangeRate;

        const bUsdValue = parseFloat(bBalance) * b.usdExchangeRate;

        return bUsdValue - aUsdValue;
    });

    return ton ? [ton, ...sortedAssets] : sortedAssets;
};
