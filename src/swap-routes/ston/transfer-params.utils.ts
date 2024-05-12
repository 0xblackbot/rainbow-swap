import {Address} from '@ton/core';

import {PROXY_TON_MASTER_ADDRESS, STON_ROUTER_ADDRESS} from './sdk';
import {packSwapParams} from './transfer-params-pack.utils';
import {JETTON_TRANSFER_GAS_AMOUNT, TON} from '../../globals';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {TransferParams} from '../../interfaces/transfer-params.interface';
import {
    getJettonTransferBody,
    getJettonWalletAddress
} from '../../utils/jetton.utils';

export const ston_getTransferParams = async (
    routeStep: RouteStepWithCalculation,
    queryId: number,
    gasAmount: bigint,
    senderAddress: Address,
    receiverAddress: Address,
    responseDestination: Address,
    applyMinOutputAmount: boolean
): Promise<TransferParams> => {
    const minOutputAmount = applyMinOutputAmount
        ? BigInt(routeStep.outputAssetAmount)
        : 0n;

    if (routeStep.inputAssetAddress === TON) {
        const stonRouterProxyTonWalletAddress = await getJettonWalletAddress(
            PROXY_TON_MASTER_ADDRESS,
            STON_ROUTER_ADDRESS
        );

        const stonRouterOutputJettonWalletAddress =
            await getJettonWalletAddress(
                routeStep.outputAssetAddress,
                STON_ROUTER_ADDRESS
            );

        const tonSwapPayload = packSwapParams({
            outputJettonWalletAddress: stonRouterOutputJettonWalletAddress,
            minOutputAmount,
            receiverAddress
        });

        return {
            to: stonRouterProxyTonWalletAddress,
            value: gasAmount + BigInt(routeStep.inputAssetAmount),
            body: getJettonTransferBody({
                queryId,
                amount: BigInt(routeStep.inputAssetAmount),
                destination: STON_ROUTER_ADDRESS,
                responseDestination: responseDestination,
                forwardTonAmount: gasAmount,
                forwardPayload: tonSwapPayload
            })
        };
    } else {
        const inputJettonWalletAddress = await getJettonWalletAddress(
            routeStep.inputAssetAddress,
            senderAddress
        );
        const outputJettonWalletAddress = await getJettonWalletAddress(
            routeStep.outputAssetAddress === TON
                ? PROXY_TON_MASTER_ADDRESS
                : routeStep.outputAssetAddress,
            STON_ROUTER_ADDRESS
        );

        const jettonSwapPayload = packSwapParams({
            outputJettonWalletAddress,
            minOutputAmount,
            receiverAddress
        });

        return {
            to: inputJettonWalletAddress,
            value: gasAmount + JETTON_TRANSFER_GAS_AMOUNT,
            body: getJettonTransferBody({
                queryId,
                amount: BigInt(routeStep.inputAssetAmount),
                destination: STON_ROUTER_ADDRESS,
                responseDestination: responseDestination,
                forwardTonAmount: gasAmount,
                forwardPayload: jettonSwapPayload
            })
        };
    }
};
