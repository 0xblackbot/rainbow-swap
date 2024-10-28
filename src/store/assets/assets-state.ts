import {Asset, AssetsRecord} from 'rainbow-swap-sdk';

import {DEFAULT_ASSETS_RECORD} from '../../data/assets-record';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface AssetsState {
    list: LoadableEntityState<Asset[]>;
    record: AssetsRecord;
    lastRequestId?: string;
    searchValue: string;
}

export const assetsInitialState: AssetsState = {
    list: createEntity(Object.values(DEFAULT_ASSETS_RECORD)),
    record: DEFAULT_ASSETS_RECORD,
    searchValue: ''
};
