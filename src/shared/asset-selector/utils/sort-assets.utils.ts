import {TON} from '../../../globals';
import {Asset} from '../../../interfaces/asset.interface';
import {BalancesRecord} from '../../../types/balances-record.type';
import {getUsdValue} from '../../../utils/get-usd-value.utils';

export const sortAssets = (
    assets: Asset[],
    balances: BalancesRecord,
    tonPrice: number | undefined
): Asset[] => {
    const ton = assets.find(asset => asset.address === TON);
    const otherAssets = assets.filter(asset => asset.address !== TON);

    const sortedAssets = otherAssets.sort((a, b) => {
        const aUsdValue = getUsdValue(
            balances[a.address] || '0',
            tonPrice ?? 0,
            a.exchangeRate,
            a.decimals
        );
        const bUsdValue = getUsdValue(
            balances[b.address] || '0',
            tonPrice ?? 0,
            b.exchangeRate,
            b.decimals
        );
        return bUsdValue - aUsdValue;
    });

    return ton ? [ton, ...sortedAssets] : sortedAssets;
};
