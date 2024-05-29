import {TransactionInfo} from '../../interfaces/transaction-info.interface.ts';
import {BalancesRecord} from '../../types/balances-record.type.ts';
import {LoadableEntityState} from '../types.ts';
import {createEntity} from '../utils/create-entity.ts';

export interface WalletState {
    balances: LoadableEntityState<BalancesRecord>;
    pendingSwapTransaction: LoadableEntityState<TransactionInfo | undefined>;
    isRainbowWalletActive: LoadableEntityState<boolean>;
    pendingActivationTransaction: LoadableEntityState<
        TransactionInfo | undefined
    >;
}

export const walletInitialState: WalletState = {
    balances: createEntity({}),
    pendingSwapTransaction: createEntity(undefined),
    isRainbowWalletActive: createEntity(false),
    pendingActivationTransaction: createEntity(undefined)
};
