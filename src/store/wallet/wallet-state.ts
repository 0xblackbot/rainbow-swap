import {BalancesRecord} from '../../types/balances-record.type';
import {SwapProgressResponse} from '../../types/get-swap-progress.type';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface WalletState {
    balances: LoadableEntityState<BalancesRecord>;
    pendingSwap: {
        bocHash: string | undefined;
        expectedMessageCount: number;
        parsedTrace: SwapProgressResponse['parsedTrace'];
        result: SwapProgressResponse['onchain'];
    };
}

export const walletInitialState: WalletState = {
    balances: createEntity({}),
    pendingSwap: {
        bocHash: undefined,
        expectedMessageCount: 0,
        parsedTrace: {
            confirmed: false,
            completedMessages: 0
        },
        result: undefined
    }
};
