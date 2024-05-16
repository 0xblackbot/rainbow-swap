import {TransactionInfo} from '../../interfaces/transaction-info.interface';
import {createActions} from '../utils/create-actions';

export const walletActions = createActions<string, Record<string, string>>(
    'wallet/LOAD_BALANCES'
);

export const addPendingSwapTransactionActions = createActions<TransactionInfo>(
    'wallet/ADD_PENDING_SWAP_TRANSACTION'
);
