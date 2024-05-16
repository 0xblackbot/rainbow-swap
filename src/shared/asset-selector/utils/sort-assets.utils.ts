import {Asset} from '../../../interfaces/asset.interface';

export const sortAssets = (
    assets: Asset[],
    balances: Record<string, string>
) => {
    const assetsWithBalances: Asset[] = [];
    const assetsWithoutBalances: Asset[] = [];

    assets.forEach(asset => {
        if (balances[asset.address]) {
            assetsWithBalances.push(asset);
        } else {
            assetsWithoutBalances.push(asset);
        }
    });

    return [...assetsWithBalances, ...assetsWithoutBalances];
};
