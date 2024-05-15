import {BalanceObject} from '../../interfaces/balance-object.interface';
import {createActions} from '../utils/create-actions';

export const balancesActions = createActions<
    {walletAddress: string},
    BalanceObject[]
>('balances/LOAD_BALANCES');
