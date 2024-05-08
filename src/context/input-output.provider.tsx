import React, {useState, FC, PropsWithChildren} from 'react';

import {InputOutputContext} from './input-output.context';
import {fakeData} from '../assets/fake-data';
import {AssetObject} from '../interfaces/asset-object.interface';

export const ContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [modalInputOpen, setInputModalOpen] = useState(false);
    const [modalOutputOpen, setOutputModalOpen] = useState(false);
    const [outputAsset, setOutputAsset] = useState<AssetObject | undefined>(
        undefined
    );
    const [inputAsset, setInputAsset] = useState<AssetObject | undefined>(
        fakeData[0]
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
                setAssets
            }}
        >
            {children}
        </InputOutputContext.Provider>
    );
};

export {InputOutputContext};
