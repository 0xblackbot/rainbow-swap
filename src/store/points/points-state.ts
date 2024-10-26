import {UNSAFE_INIT_DATA} from '../../globals';
import {
    emptyWalletPoints,
    WalletPointsResponse
} from '../../types/get-wallet-points.type';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

type WalletPointsState = Omit<WalletPointsResponse, 'tasksState'>;
export type TasksState = Record<string, LoadableEntityState<number>>;

export interface PointsState {
    refWallet: string | null;
    walletPoints: LoadableEntityState<WalletPointsState>;
    tasksState: TasksState;
}

export const pointsInitialState: PointsState = {
    refWallet: UNSAFE_INIT_DATA.refWallet,
    walletPoints: createEntity(emptyWalletPoints),
    tasksState: {}
};
