import {isDefined} from '@rnw-community/shared';
import {Asset, AssetsRecord} from 'rainbow-swap-sdk';

const EMPTY_ASSET: Asset = {
    address: 'unknown_token',
    slug: 'unknown_token',
    symbol: '???',
    name: 'Unknown token',
    image: '/icons/unknown_asset.png',
    decimals: 0,
    exchangeRate: '0',
    usdExchangeRate: 0,
    verification: 'none'
};

export const getAsset = (address: string, assetsRecord: AssetsRecord): Asset =>
    assetsRecord[address] != null
        ? assetsRecord[address]
        : {...EMPTY_ASSET, address};

export const findAssetBySlug = (
    slug: string | undefined,
    assetsRecord: AssetsRecord
) => {
    if (!isDefined(slug)) {
        return undefined;
    }

    const uppercaseSlug = slug.toUpperCase();

    const assetBySlug = Object.values(assetsRecord).find(
        item => item.slug === uppercaseSlug
    );

    if (isDefined(assetBySlug)) {
        return assetBySlug;
    }

    return assetsRecord[slug];
};
