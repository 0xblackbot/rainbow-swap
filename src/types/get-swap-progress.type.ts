import {OnchainSwap} from '../store/interfaces/on-chain-swap.interface';

export type GetSwapProgressParams = {
    bocHash: string;
};

export type SwapProgressResponse = {
    parsedTrace: {
        confirmed: boolean;
        completedMessages: number;
    };
    onchain?: OnchainSwap;
};
