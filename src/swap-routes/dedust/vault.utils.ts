import {Address, beginCell} from '@ton/core';

import {DEDUST_FACTORY_ADDRESS} from './sdk';
import {TON, TON_CLIENT} from '../../globals';

enum AssetType {
    TON = 0,
    JETTON = 1
}

const getAssetCell = (assetAddress: string) => {
    if (assetAddress === TON) {
        return beginCell().storeUint(AssetType.TON, 4).endCell();
    }

    const jettonAddress = Address.parse(assetAddress);

    return beginCell()
        .storeUint(AssetType.JETTON, 4)
        .storeInt(jettonAddress.workChain, 8)
        .storeBuffer(jettonAddress.hash)
        .endCell();
};

export const dedust_getVaultAddress = async (inputAssetAddress: string) => {
    const assetCell = getAssetCell(inputAssetAddress);

    const vaultAddressResponse = await TON_CLIENT.runMethod(
        Address.parse(DEDUST_FACTORY_ADDRESS),
        'get_vault_address',
        [{type: 'slice', cell: assetCell}]
    );

    return vaultAddressResponse.stack.readAddress();
};
