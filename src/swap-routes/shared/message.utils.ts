import {Address} from '@ton/core';

import {CalculatedSwapRoute} from './calculated-swap-route.type.ts';
import {SwapRouteType} from '../../enums/swap-route-type.enum.ts';
import {GAS_AMOUNT} from '../../globals.ts';
import {Message} from '../../types/message.type.ts';
import {getQueryId, getStateInit} from '../../utils/transfer-params.utils.ts';
import {dedust_getTransferParams} from '../dedust/transfer-params.utils.ts';
import {rainbow_getTransferParams} from '../rainbow/transfer-params.utils.ts';
import {ston_getTransferParams} from '../ston/transfer-params.utils.ts';

const getSwapRouteTransferParams = (
    swapRoute: CalculatedSwapRoute,
    senderAddress: Address
) => {
    const queryId = getQueryId();
    if (swapRoute.type === SwapRouteType.DeDust) {
        return dedust_getTransferParams(
            swapRoute.route,
            queryId,
            GAS_AMOUNT,
            senderAddress,
            senderAddress,
            senderAddress,
            true
        );
    }
    if (swapRoute.type === SwapRouteType.Ston) {
        return ston_getTransferParams(
            swapRoute.routeStep,
            queryId,
            GAS_AMOUNT,
            senderAddress,
            senderAddress,
            senderAddress,
            true
        );
    }

    return rainbow_getTransferParams(
        swapRoute.firstChunk,
        swapRoute.secondChunk,
        queryId,
        GAS_AMOUNT,
        senderAddress
    );
};

export const getSwapRouteMessage = async (
    swapRoute: CalculatedSwapRoute,
    senderAddress: Address
): Promise<Message> => {
    const transferParams = await getSwapRouteTransferParams(
        swapRoute,
        senderAddress
    );

    return {
        address: transferParams.to.toRawString(),
        amount: transferParams.value.toString(),
        payload: transferParams.body.toBoc().toString('base64'),
        stateInit: getStateInit(transferParams.init)
    };
};
