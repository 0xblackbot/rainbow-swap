import {Address, beginCell, Cell} from '@ton/core';

import {RainbowWalletOperation} from './rainbow-wallet.contract';
import {DexTypeEnum} from '../../enums/dex-type.enum';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {dedust_getTransferParams} from '../dedust/transfer-params.utils';
import {ston_getTransferParams} from '../ston/transfer-params.utils';

export const packTonSwap = (params: {
    queryId: number;
    destination: Address;
    body: Cell;
    jettonSenderAddressToListen: Address;
    jettonReceiveEffect: Cell;
}) =>
    beginCell()
        .storeUint(RainbowWalletOperation.MAKE_A_SWAP, 32)
        .storeUint(params.queryId, 64)
        .storeAddress(params.destination)
        .storeRef(params.body)
        .storeAddress(params.jettonSenderAddressToListen)
        .storeRef(params.jettonReceiveEffect)
        .endCell();

export const packJettonSwap = (params: {
    destination: Address;
    body: Cell;
    jettonSenderAddressToListen: Address;
    jettonReceiveEffect: Cell;
}) =>
    beginCell()
        .storeAddress(params.destination)
        .storeRef(params.body)
        .storeAddress(params.jettonSenderAddressToListen)
        .storeRef(params.jettonReceiveEffect)
        .endCell();

export enum EffectType {
    JettonTransfer = 0,
    DedustTonSwap = 1
}

export const packJettonReceiveEffect = (params: {
    destination: Address;
    effectType: EffectType;
    fullBody: Cell;
}) => {
    const slice = params.fullBody.beginParse();
    slice.loadUint(32); // op
    slice.loadUint(64); // queryId
    slice.loadCoins(); // amount

    return beginCell()
        .storeAddress(params.destination)
        .storeUint(params.effectType, 1)
        .storeRef(slice.asCell())
        .endCell();
};

export const getDexTransferParams = (
    route: RouteStepWithCalculation[],
    queryId: number,
    gasAmount: bigint,
    senderAddress: Address,
    receiverAddress: Address,
    responseDestination: Address,
    applyMinOutputAmount: boolean
) => {
    const dexType = route[0].dexType;

    if (dexType === DexTypeEnum.DeDust) {
        return dedust_getTransferParams(
            route,
            queryId,
            gasAmount,
            senderAddress,
            receiverAddress,
            responseDestination,
            applyMinOutputAmount
        );
    }

    if (dexType === DexTypeEnum.Ston) {
        if (route.length !== 1) {
            throw new Error(`Not supported Ston route.length ${route.length}`);
        }

        return ston_getTransferParams(
            route[0],
            queryId,
            gasAmount,
            senderAddress,
            receiverAddress,
            responseDestination,
            applyMinOutputAmount
        );
    }

    throw new Error(`Not supported dexType ${dexType}`);
};
