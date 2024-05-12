import {createContext} from 'react';

import {EMPTY_FN} from '../../utils/emptyfn';

interface IModal {
    modalInputOpen: boolean;
    setInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalOutputOpen: boolean;
    setOutputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<IModal>({
    modalInputOpen: false,
    setInputModalOpen: EMPTY_FN,
    modalOutputOpen: false,
    setOutputModalOpen: EMPTY_FN
});
