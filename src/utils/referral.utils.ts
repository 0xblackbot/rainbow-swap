import {isNotEmptyString} from '@rnw-community/shared';

import {UNSAFE_INIT_DATA} from '../globals';

const TG_BOT_REF = 'bot';

export const resolveReferralAddress = (
    refWallet: string | null,
    storedRefParent: string | undefined
) => {
    const startParam = UNSAFE_INIT_DATA.refParent;

    if (isNotEmptyString(startParam) && startParam !== TG_BOT_REF) {
        return startParam;
    }

    if (isNotEmptyString(refWallet)) {
        return refWallet;
    }

    if (startParam === TG_BOT_REF) {
        return isNotEmptyString(storedRefParent) ? storedRefParent : TG_BOT_REF;
    }

    if (isNotEmptyString(storedRefParent)) {
        return storedRefParent;
    }

    return undefined;
};
