import {Address, beginCell} from '@ton/core';

enum Operation {
    SWAP = 0x25938561
}

interface SwapParams {
    outputJettonWalletAddress: Address;
    minOutputAmount: bigint;
    receiverAddress: Address;
}

export const packSwapParams = ({
    outputJettonWalletAddress,
    minOutputAmount,
    receiverAddress
}: SwapParams) =>
    beginCell()
        .storeUint(Operation.SWAP, 32)
        .storeAddress(outputJettonWalletAddress)
        .storeCoins(minOutputAmount)
        .storeAddress(receiverAddress)
        .storeUint(0, 1) // no referralAddress
        .endCell();
