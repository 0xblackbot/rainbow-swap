import React, {useState, FC, PropsWithChildren} from 'react';

import {InputOutputContext} from './input-output.context';
import {fakeData} from '../assets/fake-data';
import {IToken} from '../interfaces/token.interface';

export const ContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [modalInputOpen, setInputModalOpen] = useState(false);
    const [modalOutputOpen, setOutputModalOpen] = useState(false);
    const [outputToken, setOutputToken] = useState<IToken | undefined>(
        undefined
    );
    const [inputToken, setInputToken] = useState<IToken | undefined>(
        fakeData[0]
    );

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
                setInputToken
            }}
        >
            {children}
        </InputOutputContext.Provider>
    );
};

export {InputOutputContext};
