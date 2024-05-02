import {createContext} from 'react';

import {IToken} from '../interfaces/token.interface';
import {EMPTY_FN} from '../utils/emptyfn';

interface InputOutputValues {
    modalInputOpen: boolean;
    setInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalOutputOpen: boolean;
    setOutputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    outputToken: IToken | undefined;
    setOutputToken: React.Dispatch<React.SetStateAction<IToken | undefined>>;
    inputToken: IToken | undefined;
    setInputToken: React.Dispatch<React.SetStateAction<IToken | undefined>>;
}

export const InputOutputContext = createContext<InputOutputValues>({
    modalInputOpen: false,
    setInputModalOpen: EMPTY_FN,
    modalOutputOpen: false,
    setOutputModalOpen: EMPTY_FN,
    outputToken: undefined,
    setOutputToken: EMPTY_FN,
    inputToken: undefined,
    setInputToken: EMPTY_FN
});
