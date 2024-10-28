import {Asset} from 'rainbow-swap-sdk';

import {useSelector} from '../index';

export const useAssetsListSelector = () =>
    useSelector(({assets}) => assets.list.data);

export const useAssetsRecordSelector = () =>
    useSelector(({assets}) => assets.record);

export const useIsAssetsLoadingSelector = () =>
    useSelector(({assets}) => assets.lastRequestId !== undefined);

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

export const useAssetSelector = (address: string) =>
    useSelector(
        ({assets}) => assets.record[address] ?? {...EMPTY_ASSET, address},
        (a, b) =>
            a.address + '_' + a.usdExchangeRate ===
            b.address + '_' + b.usdExchangeRate
    );
