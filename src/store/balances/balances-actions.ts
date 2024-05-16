import {BalanceObject} from '../../interfaces/balance-object.interface';
import {createActions} from '../utils/create-actions';

export const balancesActions = createActions<string, BalanceObject[]>(
    'balances/LOAD_BALANCES'
);
