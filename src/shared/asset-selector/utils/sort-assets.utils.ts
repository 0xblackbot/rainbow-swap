import {Asset} from '../../../interfaces/asset.interface';

export const sortAssets = (
    assets: Asset[],
    balances: Record<string, string>
) => {
    const assetsWithBalances = assets.filter(asset => balances[asset.address]);
    const assetsWithoutBalances = assets.filter(
        asset => !balances[asset.address]
    );
    return [...assetsWithBalances, ...assetsWithoutBalances];
};
