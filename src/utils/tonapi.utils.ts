import {isDefined} from '@rnw-community/shared';

import {TON_API_CLIENT} from '../globals';
import {isTraceConfirmed} from './trace.utils';

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
            const trace = await TON_API_CLIENT.traces
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
