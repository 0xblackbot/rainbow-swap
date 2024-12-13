import {SwapStatusEnum} from '../../enums/swap-status.enum';

export interface SwapHistoryData {
    timestamp: number;
    bocHash: string;
    status: SwapStatusEnum;
    completedMessageCount: number;
    sentInfo?: Info;
    receivedInfo?: Info;
    returnedInfo?: Info;
    intermediateTokensInfo?: Info[];
}

interface Info {
    amount: number;
    usdAmount: number;
    symbol: string;
}

export const EMPTY_SWAP_HISTORY_DATA: SwapHistoryData = {
    timestamp: 0,
    bocHash: '',
    status: SwapStatusEnum.Pending,
    completedMessageCount: 0
};
