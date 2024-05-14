import {TON_API_CLIENT} from '../globals';

const CHECK_INTERVAL = 1500;
const TRANSACTION_CONFIRMATION_TIMEOUT = 5 * 1000;

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
                .getAccountEvent(senderRawAddress, bocHash)
                .catch(() => ({
                    event_id: 'empty_event_id',
                    in_progress: true
                }));

            if (!accountEvent.in_progress) {
                clearInterval(intervalId);
                clearTimeout(timeoutId);

                resolve(accountEvent.event_id);
            }
        }, CHECK_INTERVAL);
    });
