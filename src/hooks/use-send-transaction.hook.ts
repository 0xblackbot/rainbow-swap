import {isDefined} from '@rnw-community/shared';
import {useCallback, useState} from 'react';

import {useDisableMainButton} from './use-disable-main-button.hook';
import {TransactionInfo} from '../interfaces/transaction-info.interface';
import {useTonConnectUI} from '../tonconnect/useTonConnectUI';
import {Message} from '../types/message.type';
import {bocToHash} from '../utils/boc.utils';
import {showErrorToast} from '../utils/toast.utils';

export const useSendTransaction = () => {
    const [tonConnectUI] = useTonConnectUI();
    const [isOpen, setIsOpen] = useState(false);

    useDisableMainButton(isOpen);

    return useCallback(
        (messages: Message[]) => {
            setIsOpen(true);
            const senderAddress = tonConnectUI.wallet?.account.address;

            if (!isDefined(senderAddress)) {
                throw new Error('Wallet not connected');
            }

            return tonConnectUI
                .sendTransaction({
                    validUntil: Math.floor(Date.now() / 1000) + 1 * 60,
                    from: senderAddress,
                    messages
                })
                .then(async (response): Promise<TransactionInfo> => {
                    const bocHash = await bocToHash(response.boc);

                    return {
                        senderRawAddress: senderAddress,
                        bocHash
                    };
                })
                .catch(() => {
                    showErrorToast('Transaction cancelled, try again...');

                    return undefined;
                })
                .finally(() => {
                    setIsOpen(false);
                });
        },
        [tonConnectUI]
    );
};
