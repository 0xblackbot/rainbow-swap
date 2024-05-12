import {DEFAULT_ASSETS_RECORD} from '../../data/assets-record';
import {AssetsRecord} from '../../types/assets-record.type';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface AssetsState {
    record: LoadableEntityState<AssetsRecord>;
}

export const assetsInitialState: AssetsState = {
    record: createEntity(DEFAULT_ASSETS_RECORD)
};
