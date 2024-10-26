import {useContext} from 'react';

import {ModalsContext} from './modals.context';

export const useModals = () => useContext(ModalsContext);
