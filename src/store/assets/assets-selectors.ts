import {Asset} from 'rainbow-swap-sdk';
import {useMemo} from 'react';

import {useSelector} from '../index';

const EMPTY_ASSET: Asset = {
    symbol: '???',
    name: 'Unknown token',
    address: 'unknown_token',
    image: '/icons/unknown_asset.png',
    decimals: 0,
    exchangeRate: '0',
    verification: 'none'
};

export const useAssetSelector = (address: string) =>
    useSelector(
        ({assets}) => assets.record.data[address] ?? {...EMPTY_ASSET, address},
        (a, b) =>
            a.address + '_' + a.exchangeRate ===
            b.address + '_' + b.exchangeRate
    );

export const useAssetsListSelector = () => {
    const assetsRecord = useSelector(({assets}) => assets.record.data);

    return useMemo(() => Object.values(assetsRecord), [assetsRecord]);
};
