import {useState, FC, PropsWithChildren} from 'react';

import {ModalContext} from './modal.context';

export const ModalProvider: FC<PropsWithChildren> = ({children}) => {
    const [modalInputOpen, setInputModalOpen] = useState(false);
    const [modalOutputOpen, setOutputModalOpen] = useState(false);

    return (
        <ModalContext.Provider
            value={{
                modalInputOpen,
                setInputModalOpen,
                modalOutputOpen,
                setOutputModalOpen
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
