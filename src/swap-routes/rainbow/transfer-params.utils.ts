import {Address} from '@ton/core';

import {RainbowWalletContract} from './rainbow-wallet.contract';
import {
    EffectType,
    getDexTransferParams,
    packJettonReceiveEffect,
    packJettonSwap,
    packTonSwap
} from './transfer-params-pack.utils';
import {DexTypeEnum} from '../../enums/dex-type.enum';
import {JETTON_TRANSFER_GAS_AMOUNT, TON, WORKCHAIN} from '../../globals';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {TransferParams} from '../../interfaces/transfer-params.interface';
import {
    getJettonTransferBody,
    getJettonWalletAddress
} from '../../utils/jetton.utils';
import {dedust_getVaultAddress} from '../dedust/vault.utils';
import {STON_ROUTER_ADDRESS} from '../ston/sdk';

export const rainbow_getTransferParams = async (
    firstChunk: RouteStepWithCalculation[],
    secondChunk: RouteStepWithCalculation[],
    queryId: number,
    gasAmount: bigint,
    senderAddress: Address
): Promise<TransferParams> => {
    const rainbowWallet = RainbowWalletContract.create({
        workchain: WORKCHAIN,
        ownerAddress: senderAddress
    });

    const inputAssetAddress = firstChunk[0].inputAssetAddress;

    const secondChunk_transferParams = await getDexTransferParams(
        secondChunk,
        queryId,
        gasAmount,
        rainbowWallet.address,
        senderAddress,
        senderAddress,
        false
    );

    const jettonSenderAddressToListen =
        firstChunk[0].dexType === DexTypeEnum.Ston
            ? STON_ROUTER_ADDRESS
            : await dedust_getVaultAddress(
                  firstChunk[firstChunk.length - 1].outputAssetAddress
              );

    const jettonReceiveEffectType =
        secondChunk[0].dexType === DexTypeEnum.DeDust &&
        secondChunk[0].inputAssetAddress === TON
            ? EffectType.DedustTonSwap
            : EffectType.JettonTransfer;

    const jettonReceiveEffectGasAmount =
        jettonReceiveEffectType === EffectType.DedustTonSwap
            ? 2n * JETTON_TRANSFER_GAS_AMOUNT
            : 3n * JETTON_TRANSFER_GAS_AMOUNT;

    const jettonReceiveEffect = packJettonReceiveEffect({
        effectType: jettonReceiveEffectType,
        destination: secondChunk_transferParams.to,
        fullBody: secondChunk_transferParams.body
    });

    const firstChunk_transferParams = await getDexTransferParams(
        firstChunk,
        queryId,
        gasAmount + jettonReceiveEffectGasAmount,
        rainbowWallet.address,
        rainbowWallet.address,
        senderAddress,
        false // implement minOutputAmount support by contract TODO: BB-38
    );

    if (inputAssetAddress === TON) {
        return {
            to: rainbowWallet.address,
            value: firstChunk_transferParams.value,
            body: packTonSwap({
                queryId,
                destination: firstChunk_transferParams.to,
                body: firstChunk_transferParams.body,
                jettonSenderAddressToListen,
                jettonReceiveEffect
            })
        };
    } else {
        const inputJettonWalletAddress = await getJettonWalletAddress(
            inputAssetAddress,
            senderAddress
        );

        const jettonSwapPayload = packJettonSwap({
            destination: firstChunk_transferParams.to,
            body: firstChunk_transferParams.body,
            jettonSenderAddressToListen,
            jettonReceiveEffect
        });

        return {
            to: inputJettonWalletAddress,
            value: firstChunk_transferParams.value + JETTON_TRANSFER_GAS_AMOUNT,
            body: getJettonTransferBody({
                queryId,
                amount: BigInt(firstChunk[0].inputAssetAmount),
                destination: rainbowWallet.address,
                responseDestination: senderAddress,
                forwardTonAmount: firstChunk_transferParams.value,
                forwardPayload: jettonSwapPayload
            })
        };
    }
};
