import {TransactionInfo} from '../../interfaces/transaction-info.interface';
import {BalancesRecord} from '../../types/balances-record.type';
import {createActions} from '../utils/create-actions';

export const loadBalancesActions = createActions<string, BalancesRecord>(
    'wallet/LOAD_BALANCES'
);

export const addPendingSwapTransactionActions = createActions<TransactionInfo>(
    'wallet/ADD_PENDING_SWAP_TRANSACTION'
);

export const checkIsRainbowWalletActiveActions = createActions<string, boolean>(
    'wallet/IS_RAINBOW_WALLET_ACTIVE'
);
