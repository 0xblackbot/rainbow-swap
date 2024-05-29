import {Address} from '@ton/core';
import {useTonConnectUI} from '@tonconnect/ui-react';
import {useCallback} from 'react';

import {TransactionInfo} from '../interfaces/transaction-info.interface.ts';
import {TransferParams} from '../interfaces/transfer-params.interface.ts';
import {transferParamsToMessages} from '../swap-routes/shared/message.utils.ts';
import {bocToHash} from '../utils/boc.utils.ts';

export const useSendTransaction = () => {
    const [tonConnectUI] = useTonConnectUI();

    return useCallback(
        (transferParams: TransferParams[], senderAddress: Address) => {
            const senderRawAddress = senderAddress.toRawString();

            return tonConnectUI
                .sendTransaction({
                    validUntil: Math.floor(Date.now() / 1000) + 1 * 60,
                    from: senderRawAddress,
                    messages: transferParamsToMessages(transferParams)
                })
                .then(
                    (response): TransactionInfo => ({
                        senderRawAddress,
                        bocHash: bocToHash(response.boc)
                    })
                )
                .catch(() => undefined);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [tonConnectUI.sendTransaction]
    );
};
