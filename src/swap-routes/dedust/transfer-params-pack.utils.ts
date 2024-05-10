import {isDefined} from '@rnw-community/shared';
import {Address, beginCell, Cell} from '@ton/core';

import {SwapParams, SwapStep} from './sdk';

enum Operation {
    TON_SWAP = 3926267997,
    JETTON_SWAP = 3818968194
}

export const packTonSwap = (params: {
    queryId: number;
    inputAmount: bigint;
    poolAddress: Address;
    minOutputAmount: bigint;
    nextSwapStep?: SwapStep;
    swapParams?: SwapParams;
}) =>
    beginCell()
        .storeUint(Operation.TON_SWAP, 32)
        .storeUint(params.queryId, 64)
        .storeCoins(params.inputAmount)
        .storeAddress(params.poolAddress)
        .storeUint(0, 1)
        .storeCoins(params.minOutputAmount)
        .storeMaybeRef(packNextSwapStep(params.nextSwapStep))
        .storeRef(packSwapParams(params.swapParams))
        .endCell();

export const packJettonSwap = (params: {
    poolAddress: Address;
    minOutputAmount: bigint;
    nextSwapStep?: SwapStep;
    swapParams?: SwapParams;
}) =>
    beginCell()
        .storeUint(Operation.JETTON_SWAP, 32)
        .storeAddress(params.poolAddress)
        .storeUint(0, 1) // reserved
        .storeCoins(params.minOutputAmount)
        .storeMaybeRef(packNextSwapStep(params.nextSwapStep))
        .storeRef(packSwapParams(params.swapParams))
        .endCell();

const packNextSwapStep = (step?: SwapStep): Cell | null => {
    if (!isDefined(step)) {
        return null;
    }

    return beginCell()
        .storeAddress(step.poolAddress)
        .storeUint(0, 1) // reserved
        .storeCoins(step.limit ?? 0n)
        .storeMaybeRef(packNextSwapStep(step.next))
        .endCell();
};

const packSwapParams = (params: SwapParams = {}) =>
    beginCell()
        .storeUint(params.deadline ?? 0, 32)
        .storeAddress(params.recipientAddress ?? null)
        .storeAddress(params.referralAddress ?? null)
        .storeMaybeRef(params.fulfillPayload)
        .storeMaybeRef(params.rejectPayload)
        .endCell();
