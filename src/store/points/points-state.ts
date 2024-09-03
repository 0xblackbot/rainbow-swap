import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface PointsState {
    isModalOpen: boolean;
    localTapTap: number;
    refHash: string;
    tapTap: LoadableEntityState<number>;
    referral: LoadableEntityState<number>;
    telegramChannel: LoadableEntityState<number>;
    xChannel: LoadableEntityState<number>;
    partners: Record<string, LoadableEntityState<number>>;
}

export const pointsInitialState: PointsState = {
    isModalOpen: false,
    localTapTap: 0,
    refHash: '',
    tapTap: createEntity(0),
    referral: createEntity(0),
    telegramChannel: createEntity(0),
    xChannel: createEntity(0),
    partners: {}
};
