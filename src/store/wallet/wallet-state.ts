import {UNSAFE_INIT_DATA} from '../../globals';
import {
    emptyWalletPoints,
    WalletPointsState
} from '../../interfaces/wallet-points-swate.interface';
import {BalancesRecord} from '../../types/balances-record.type';
import {
    RainbowWithdrawal,
    RainbowWalletInfo
} from '../../types/rainbow-wallet.type';
import {
    EMPTY_SWAP_HISTORY_DATA,
    SwapHistoryData
} from '../interfaces/swap-history-data.interface';
import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

type WalletPoints = Omit<WalletPointsState, 'tasksState'>;
export type TasksState = Record<string, LoadableEntityState<number>>;

export interface WalletState {
    rainbowWithdrawals: Record<string, RainbowWithdrawal>;
    rainbowWithdrawalCooldowns: Record<string, number>;
    rainbowWallet: {
        ownerAddress: string | null;
        data: RainbowWalletInfo | null;
    };
    balances: LoadableEntityState<BalancesRecord>;
    pointsState: {
        refWallet: string | null;
        walletPoints: LoadableEntityState<WalletPoints>;
        tasks: TasksState;
    };
    swapsState: {
        pending: {
            bocHash: string | undefined;
            createdAt: number | undefined; // local pending bocHash creation time
            expectedMessageCount: number;
            historyData: SwapHistoryData;
        };
        history: LoadableEntityState<SwapHistoryData[]>;
    };
}

export const walletInitialState: WalletState = {
    rainbowWithdrawals: {},
    rainbowWithdrawalCooldowns: {},
    rainbowWallet: {ownerAddress: null, data: null},
    balances: createEntity({}),
    pointsState: {
        refWallet: UNSAFE_INIT_DATA.refWallet,
        walletPoints: createEntity(emptyWalletPoints),
        tasks: {}
    },
    swapsState: {
        pending: {
            bocHash: undefined,
            createdAt: undefined,
            expectedMessageCount: 0,
            historyData: EMPTY_SWAP_HISTORY_DATA
        },
        history: createEntity([])
    }
};
