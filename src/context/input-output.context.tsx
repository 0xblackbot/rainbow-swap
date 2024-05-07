import {createContext} from 'react';

import {IAssetsPair} from '../interfaces/assets.interface';
import {EMPTY_FN} from '../utils/emptyfn';

interface InputOutputValues {
    modalInputOpen: boolean;
    setInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalOutputOpen: boolean;
    setOutputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    outputToken: IAssetsPair | undefined;
    setOutputToken: React.Dispatch<
        React.SetStateAction<IAssetsPair | undefined>
    >;
    inputToken: IAssetsPair | undefined;
    setInputToken: React.Dispatch<
        React.SetStateAction<IAssetsPair | undefined>
    >;
    assets: IAssetsPair[];
    setAssets: React.Dispatch<React.SetStateAction<IAssetsPair[]>>;
}

export const InputOutputContext = createContext<InputOutputValues>({
    modalInputOpen: false,
    setInputModalOpen: EMPTY_FN,
    modalOutputOpen: false,
    setOutputModalOpen: EMPTY_FN,
    outputToken: undefined,
    setOutputToken: EMPTY_FN,
    inputToken: undefined,
    setInputToken: EMPTY_FN,
    assets: [],
    setAssets: EMPTY_FN
});
