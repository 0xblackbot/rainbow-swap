import {isDefined} from '@rnw-community/shared';
import {beginCell, storeStateInit} from '@ton/core';

import {TransferParams} from '../../interfaces/transfer-params.interface.ts';
import {Message} from '../../types/message.type.ts';

export const transferParamsToMessages = (
    transferParamsArray: TransferParams[]
) =>
    transferParamsArray.map<Message>(transferParams => ({
        address: transferParams.to.toRawString(),
        amount: transferParams.value.toString(),
        payload: isDefined(transferParams.body)
            ? transferParams.body.toBoc().toString('base64')
            : undefined,
        stateInit: isDefined(transferParams.init)
            ? beginCell()
                  .store(storeStateInit(transferParams.init))
                  .endCell()
                  .toBoc()
                  .toString('base64')
            : undefined
    }));
