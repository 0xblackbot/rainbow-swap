import {
    emptyWalletPoints,
    WalletPointsState
} from '../interfaces/wallet-points-swate.interface';
import {SwapHistoryData} from '../store/interfaces/swap-history-data.interface';

export type GetWalletDataParams = {
    address: string;
    initData: string;
    refParent?: string;
};

export type WalletDataResponse = {
    pointsState: WalletPointsState;
    swapHistory: SwapHistoryData[];
};

export const EMPTY_WALLET_DATA: WalletDataResponse = {
    pointsState: emptyWalletPoints,
    swapHistory: []
};
