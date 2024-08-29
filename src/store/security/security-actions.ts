import {AppStatus} from 'rainbow-swap-sdk';

import {createActions} from '../utils/create-actions';

export const loadAppStatusActions = createActions<void, AppStatus>(
    'security/LOAD_APP_STATUS'
);
