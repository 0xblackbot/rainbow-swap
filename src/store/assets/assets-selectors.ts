import {getAsset} from '../../utils/asset.utils';
import {useSelector} from '../index';

export const useAssetsListSelector = () =>
    useSelector(({assets}) => assets.list.data);

export const useAssetsRecordSelector = () =>
    useSelector(({assets}) => assets.record);

export const useIsAssetsLoadingSelector = () =>
    useSelector(({assets}) => assets.lastRequestId !== undefined);

export const useAssetSelector = (address: string) =>
    useSelector(
        ({assets}) => getAsset(address, assets.record),
        (a, b) =>
            a.address + '_' + a.usdExchangeRate ===
            b.address + '_' + b.usdExchangeRate
    );
