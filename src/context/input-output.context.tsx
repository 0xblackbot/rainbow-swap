import {createContext} from 'react';

import {IAssets} from '../interfaces/assets.interface';
import {EMPTY_FN} from '../utils/emptyfn';

interface InputOutputValues {
    modalInputOpen: boolean;
    setInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalOutputOpen: boolean;
    setOutputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    outputToken: IAssets | undefined;
    setOutputToken: React.Dispatch<React.SetStateAction<IAssets | undefined>>;
    inputToken: IAssets | undefined;
    setInputToken: React.Dispatch<React.SetStateAction<IAssets | undefined>>;
    assets: IAssets[];
    setAssets: React.Dispatch<React.SetStateAction<IAssets[]>>;
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
