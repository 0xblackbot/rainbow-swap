import {TransactionInfo} from '../../interfaces/transaction-info.interface';
import {BalancesRecord} from '../../types/balances-record.type';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface WalletState {
    balances: LoadableEntityState<BalancesRecord>;
    pendingSwapTransaction: LoadableEntityState<TransactionInfo | undefined>;
}

export const walletInitialState: WalletState = {
    balances: createEntity({}),
    pendingSwapTransaction: createEntity(undefined)
};
