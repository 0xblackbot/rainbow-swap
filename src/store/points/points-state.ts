import {REF_PARENT} from '../../globals';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface PointsState {
    isModalOpen: boolean;
    localTapTap: number;
    tapTap: LoadableEntityState<number>;
    referral: LoadableEntityState<number>;
    telegramChannel: LoadableEntityState<number>;
    xChannel: LoadableEntityState<number>;
}

export const pointsInitialState: PointsState = {
    isModalOpen: REF_PARENT !== undefined,
    localTapTap: 0,
    tapTap: createEntity(0),
    referral: createEntity(0),
    telegramChannel: createEntity(0),
    xChannel: createEntity(0)
};
