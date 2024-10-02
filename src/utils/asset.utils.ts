import {isDefined} from '@rnw-community/shared';
import {AssetsRecord} from 'rainbow-swap-sdk';

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
