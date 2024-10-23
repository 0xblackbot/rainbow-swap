import {isDefined} from '@rnw-community/shared';
import {Trace} from '@ton-api/client';

export const isTraceConfirmed = (trace: Trace) => {
    if (trace.emulated === true) {
        return false;
    }

    return countUncompleted(trace) === 0;
};

const countUncompleted = (trace: Trace): number => {
    let counter = 0;

    for (const msg of trace.transaction.outMsgs) {
        if (isDefined(msg.destination)) {
            counter++;
        }
    }

    if (trace.children) {
        for (const child of trace.children) {
            counter += countUncompleted(child);
        }
    }

    return counter;
};
