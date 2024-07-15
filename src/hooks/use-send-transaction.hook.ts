import {Address} from '@ton/core';
import {useTonConnectUI} from '@tonconnect/ui-react';
import {useCallback, useState} from 'react';

import {useDisableMainButton} from './use-disable-main-button.hook';
import {TransactionInfo} from '../interfaces/transaction-info.interface';
import {Message} from '../types/message.type';
import {bocToHash} from '../utils/boc.utils';
import {showErrorToast} from '../utils/toast.utils';

export const useSendTransaction = () => {
    const [tonConnectUI] = useTonConnectUI();
    const [isOpen, setIsOpen] = useState(false);

    useDisableMainButton(isOpen);
    return useCallback(
        (senderAddress: Address, messages: Message[]) => {
            setIsOpen(true);
            const senderRawAddress = senderAddress.toRawString();

            return tonConnectUI
                .sendTransaction({
                    validUntil: Math.floor(Date.now() / 1000) + 1 * 60,
                    from: senderRawAddress,
                    messages
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
