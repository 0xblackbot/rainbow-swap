import {TransactionInfo} from '../../interfaces/transaction-info.interface.ts';
import {BalancesRecord} from '../../types/balances-record.type.ts';
import {LoadableEntityState} from '../types.ts';
import {createEntity} from '../utils/create-entity.ts';

export interface WalletState {
    balances: LoadableEntityState<BalancesRecord>;
    isRainbowWalletActive: LoadableEntityState<boolean>;
    pendingSwapTransaction: LoadableEntityState<TransactionInfo | undefined>;
}

export const walletInitialState: WalletState = {
    balances: createEntity({}),
    isRainbowWalletActive: createEntity(false),
    pendingSwapTransaction: createEntity(undefined)
};
