import {TON} from '../../../globals';
import {Asset} from '../../../interfaces/asset.interface';
import {BalancesRecord} from '../../../types/balances-record.type';
import {parseBalance} from '../../../utils/balance-parse.utils';

export const sortAssets = (
    assets: Asset[],
    balances: BalancesRecord
): Asset[] => {
    const ton = assets.find(asset => asset.address === TON);
    const otherAssets = assets.filter(asset => asset.address !== TON);

    const sortedAssets = otherAssets.sort((a, b) => {
        const aBalance = balances[a.address] || '0';
        const bBalance = balances[b.address] || '0';
        const aDecimals = a.decimals;
        const bDecimals = b.decimals;

        const aUsdValue =
            parseBalance(aBalance, aDecimals) * parseFloat(a.exchangeRate);

        const bUsdValue =
            parseBalance(bBalance, bDecimals) * parseFloat(b.exchangeRate);

        return bUsdValue - aUsdValue;
    });

    return ton ? [ton, ...sortedAssets] : sortedAssets;
};
