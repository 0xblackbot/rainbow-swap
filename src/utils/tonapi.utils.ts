import {Address} from '@ton/core';

import {TON_API_CLIENT} from '../globals';

const CHECK_INTERVAL = 2500;
const TRANSACTION_CONFIRMATION_TIMEOUT = 5 * 60 * 1000;

export const waitTransactionConfirmation = async (
    senderRawAddress: string,
    bocHash: string
) =>
    new Promise<string>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);

            reject(
                `transaction confirmation timeout (sender: ${senderRawAddress}, hash: ${bocHash})`
            );
        }, TRANSACTION_CONFIRMATION_TIMEOUT);

        const intervalId = setInterval(async () => {
            const accountEvent = await TON_API_CLIENT.accounts
                .getAccountEvent(Address.parse(senderRawAddress), bocHash)
                .catch(() => ({
                    eventId: 'empty_event_id',
                    inProgress: true
                }));

            if (!accountEvent.inProgress) {
                clearInterval(intervalId);
                clearTimeout(timeoutId);

                resolve(accountEvent.eventId);
            }
        }, CHECK_INTERVAL);
    });
