import {isDefined} from '@rnw-community/shared';

import {isTraceConfirmed} from './trace.utils';

const CHECK_INTERVAL = 3000;
const TRANSACTION_CONFIRMATION_TIMEOUT = 5 * 60 * 1000;

export const waitTransactionConfirmation = async (
    senderRawAddress: string,
    bocHash: string
) => {
    const {TonApiClient} = await import('@ton-api/client');

    const tonApiClient = new TonApiClient({
        baseUrl: 'https://tonapi.io'
    });

    return new Promise<string>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);

            reject(
                `transaction confirmation timeout (sender: ${senderRawAddress}, hash: ${bocHash})`
            );
        }, TRANSACTION_CONFIRMATION_TIMEOUT);

        const intervalId = setInterval(async () => {
            const trace = await tonApiClient.traces
                .getTrace(bocHash)
                .catch(() => undefined);

            const isConfirmed = isDefined(trace) && isTraceConfirmed(trace);

            if (isConfirmed) {
                clearInterval(intervalId);
                clearTimeout(timeoutId);

                resolve(bocHash);
            }
        }, CHECK_INTERVAL);
    });
};
