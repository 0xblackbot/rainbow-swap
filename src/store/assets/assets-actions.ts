import {AssetsRecord} from '../../types/assets-record.type';
import {createActions} from '../utils/create-actions';

export const loadAssetsActions = createActions<void, AssetsRecord>(
    'assets/LOAD_ASSETS'
);
