import {AssetsRecord} from '../../types/assets-record.type.ts';
import {createActions} from '../utils/create-actions.ts';

export const loadAssetsActions = createActions<void, AssetsRecord>(
    'assets/LOAD_ASSETS'
);
