import {useContext} from 'react';

import {ModalContext} from './modal.context';

export const useModalContext = () => useContext(ModalContext);
