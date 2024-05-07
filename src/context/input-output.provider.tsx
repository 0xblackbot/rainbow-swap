import React, {useState, FC, PropsWithChildren} from 'react';

import {InputOutputContext} from './input-output.context';
import {fakeData} from '../assets/fake-data';
import {IAssetsPair} from '../interfaces/assets.interface';

export const ContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [modalInputOpen, setInputModalOpen] = useState(false);
    const [modalOutputOpen, setOutputModalOpen] = useState(false);
    const [outputToken, setOutputToken] = useState<IAssetsPair | undefined>(
        undefined
    );
    const [inputToken, setInputToken] = useState<IAssetsPair | undefined>(
        fakeData[0]
    );
    const [assets, setAssets] = useState<IAssetsPair[]>([]);

    return (
        <InputOutputContext.Provider
            value={{
                modalInputOpen,
                setInputModalOpen,
                modalOutputOpen,
                setOutputModalOpen,
                outputToken,
                setOutputToken,
                inputToken,
                setInputToken,
                assets,
                setAssets
            }}
        >
            {children}
        </InputOutputContext.Provider>
    );
};

export {InputOutputContext};
