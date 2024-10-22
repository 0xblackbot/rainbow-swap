import {Trace} from '@ton-api/client';

export const isTraceConfirmed = (trace: Trace) => {
    // If the trace is emulated, it is not confirmed
    if (trace.emulated === true) {
        return false;
    }

    // If outMsgs exist, children traces are not generated yet (still pending)
    if (trace.transaction.outMsgs.length > 0) {
        return false;
    }

    // If there are children, we need to check if all of them are confirmed
    if (trace.children) {
        for (const child of trace.children) {
            if (!isTraceConfirmed(child)) {
                return false;
            }
        }
    }

    return true;
};
