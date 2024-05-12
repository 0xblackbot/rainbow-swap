import {useState, FC, PropsWithChildren} from 'react';

import {AssetsContext} from './assets.context';
import {DEFAULT_ASSETS_LIST} from '../../data/default-asset-list';
import {Asset} from '../../interfaces/asset.interface';

export const AssetsProvider: FC<PropsWithChildren> = ({children}) => {
    const [inputAssetAmount, setInputAssetAmount] = useState('');
    const [outputAsset, setOutputAsset] = useState<Asset | undefined>(
        undefined
    );
    const [inputAsset, setInputAsset] = useState<Asset | undefined>(
        DEFAULT_ASSETS_LIST[0]
    );

    return (
        <AssetsContext.Provider
            value={{
                outputAsset,
                setOutputAsset,
                inputAsset,
                setInputAsset,
                inputAssetAmount,
                setInputAssetAmount
            }}
        >
            {children}
        </AssetsContext.Provider>
    );
};
