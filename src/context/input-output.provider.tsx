import React, {useState, FC, PropsWithChildren} from 'react';

import {InputOutputContext} from './input-output.context';
import {offlineAssetList} from '../assets/offline-asset-list';
import {AssetObject} from '../interfaces/asset-object.interface';

export const ContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [modalInputOpen, setInputModalOpen] = useState(false);
    const [modalOutputOpen, setOutputModalOpen] = useState(false);
    const [inputAssetAmount, setInputAssetAmount] = useState('');
    const [outputAsset, setOutputAsset] = useState<AssetObject | undefined>(
        undefined
    );
    const [inputAsset, setInputAsset] = useState<AssetObject | undefined>(
        offlineAssetList[0]
    );
    const [assets, setAssets] = useState<AssetObject[]>([]);

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
