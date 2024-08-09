import {useMemo} from 'react';

import {useSelector} from '../index';

export const useAssetSelector = (address: string) =>
    useSelector(
        ({assets}) => assets.record.data[address],
        (a, b) =>
            a.address + '_' + a.exchangeRate ===
            b.address + '_' + b.exchangeRate
    );

export const useAssetsListSelector = () => {
    const assetsRecord = useSelector(({assets}) => assets.record.data);

    return useMemo(() => Object.values(assetsRecord), [assetsRecord]);
};
