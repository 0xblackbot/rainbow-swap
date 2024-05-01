import React, {createContext, useState} from 'react';

import {fakeData} from '../assets/fake-data';
import {IToken} from '../interfaces/token.interface';

interface ContextProps {
    modalInputOpen: boolean;
    setInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalOutputOpen: boolean;
    setOutputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    outputToken: IToken | undefined;
    setOutputToken: React.Dispatch<React.SetStateAction<IToken | undefined>>;
    inputToken: IToken | undefined;
    setInputToken: React.Dispatch<React.SetStateAction<IToken | undefined>>;
}

export const Context = createContext<ContextProps>({
    modalInputOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setInputModalOpen: () => {},
    modalOutputOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setOutputModalOpen: () => {},
    outputToken: undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setOutputToken: () => {},
    inputToken: undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setInputToken: () => {}
});

export const ContextProvider: React.FC<{children: React.ReactNode}> = ({
    children
}) => {
    const [modalInputOpen, setInputModalOpen] = useState(false);
    const [modalOutputOpen, setOutputModalOpen] = useState(false);
    const [outputToken, setOutputToken] = useState<IToken | undefined>(
        undefined
    );
    const [inputToken, setInputToken] = useState<IToken | undefined>(
        fakeData[0]
    );

    return (
        <Context.Provider
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
        </Context.Provider>
    );
};
