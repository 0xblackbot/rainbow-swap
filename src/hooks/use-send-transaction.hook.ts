import {Address} from '@ton/core';
import {useTonConnectUI} from '@tonconnect/ui-react';
import {useCallback, useState} from 'react';

import {useDisableMainButton} from './use-disable-main-button.hook.ts';
import {TransactionInfo} from '../interfaces/transaction-info.interface.ts';
import {TransferParams} from '../interfaces/transfer-params.interface.ts';
import {transferParamsToMessages} from '../swap-routes/shared/message.utils.ts';
import {bocToHash} from '../utils/boc.utils.ts';
import {showErrorToast} from '../utils/toast.utils.ts';

export const useSendTransaction = () => {
    const [tonConnectUI] = useTonConnectUI();
    const [isOpen, setIsOpen] = useState(false);

    useDisableMainButton(isOpen);
    return useCallback(
        (transferParams: TransferParams[], senderAddress: Address) => {
            setIsOpen(true);
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
                .catch(() => {
                    showErrorToast('Transaction cancelled, try again...');

                    return undefined;
                })
                .finally(() => {
                    setIsOpen(false);
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [tonConnectUI.sendTransaction]
    );
};
