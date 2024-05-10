import React, {useState, FC, PropsWithChildren} from 'react';

import {InputOutputContext} from './input-output.context';
import {offlineAssetList} from '../assets/offline-asset-list';
import {Asset} from '../interfaces/asset.interface';

export const ContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [modalInputOpen, setInputModalOpen] = useState(false);
    const [modalOutputOpen, setOutputModalOpen] = useState(false);
    const [inputAssetAmount, setInputAssetAmount] = useState('');
    const [outputAsset, setOutputAsset] = useState<Asset | undefined>(
        undefined
    );
    const [inputAsset, setInputAsset] = useState<Asset | undefined>(
        offlineAssetList[0]
    );
    const [assets, setAssets] = useState<Asset[]>(offlineAssetList);

    return (
        <InputOutputContext.Provider
            value={{
                modalInputOpen,
                setInputModalOpen,
                modalOutputOpen,
                setOutputModalOpen,
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
        </InputOutputContext.Provider>
    );
};

export {InputOutputContext};
