import {BalanceObject} from '../../interfaces/balance-object.interface';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface BalancesState {
    balances: LoadableEntityState<BalanceObject[]>;
}

export const balancesInitialState: BalancesState = {
    balances: createEntity([])
};
