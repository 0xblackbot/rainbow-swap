import {Address, beginCell, Cell} from '@ton/core';

import {TON_CLIENT} from '../globals';

export const getJettonWalletAddress = async (
    jettonMasterAddress: string,
    ownerAddress: Address
) => {
    const wallerAddressResponse = await TON_CLIENT.runMethod(
        Address.parse(jettonMasterAddress),
        'get_wallet_address',
        [
            {
                type: 'slice',
                cell: beginCell().storeAddress(ownerAddress).endCell()
            }
        ]
    );

    return wallerAddressResponse.stack.readAddress();
};

enum Operation {
    TRANSFER = 260734629
}

export const getJettonTransferBody = (params: {
    queryId?: number;
    amount: bigint;
    destination: Address;
    responseDestination: Address;
    customPayload?: Cell;
    forwardTonAmount: bigint;
    forwardPayload: Cell;
}) =>
    beginCell()
        .storeUint(Operation.TRANSFER, 32)
        .storeUint(params.queryId ?? 0, 64)
        .storeCoins(params.amount)
        .storeAddress(params.destination)
        .storeAddress(params.responseDestination) // address where to return fee (diff between input fee and forwardAmount)
        .storeMaybeRef(params.customPayload ?? null)
        .storeCoins(params.forwardTonAmount)
        .storeMaybeRef(params.forwardPayload)
        .endCell();
