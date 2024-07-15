import {AssetsRecord} from 'rainbow-swap-sdk';

import {createActions} from '../utils/create-actions';

export const loadAssetsActions = createActions<void, AssetsRecord>(
    'assets/LOAD_ASSETS'
);
