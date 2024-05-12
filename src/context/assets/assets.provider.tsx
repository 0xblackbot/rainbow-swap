import {useState, FC, PropsWithChildren} from 'react';

import {AssetsContext} from './assets.context';
import {offlineAssetList} from '../../assets/offline-asset-list';
import {Asset} from '../../interfaces/asset.interface';

export const AssetsProvider: FC<PropsWithChildren> = ({children}) => {
    const [inputAssetAmount, setInputAssetAmount] = useState('');
    const [outputAsset, setOutputAsset] = useState<Asset | undefined>(
        undefined
    );
    const [inputAsset, setInputAsset] = useState<Asset | undefined>(
        offlineAssetList[0]
    );
    const [assets, setAssets] = useState<Asset[]>(offlineAssetList);

    return (
        <AssetsContext.Provider
            value={{
                outputAsset,
                setOutputAsset,
                inputAsset,
                setInputAsset,
                assets,
                setAssets,
                inputAssetAmount,
                setInputAssetAmount
            }}
        >
            {children}
        </AssetsContext.Provider>
    );
};
