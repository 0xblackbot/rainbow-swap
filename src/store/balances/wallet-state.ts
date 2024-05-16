import {TransactionInfo} from '../../interfaces/transaction-info.interface.ts';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface WalletState {
    balances: LoadableEntityState<Record<string, string>>;
    pendingSwapTransaction: LoadableEntityState<TransactionInfo | undefined>;
}

export const walletInitialState: WalletState = {
    balances: createEntity({}),
    pendingSwapTransaction: createEntity(undefined)
};
