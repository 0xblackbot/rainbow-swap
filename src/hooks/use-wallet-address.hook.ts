import {isNotEmptyString} from '@rnw-community/shared';
import {useTonAddress} from '@tonconnect/ui-react';
import {useMemo} from 'react';

export const useWalletAddress = () => {
    const walletAddress = useTonAddress();

    return useMemo(
        () => (isNotEmptyString(walletAddress) ? walletAddress : undefined),
        [walletAddress]
    );
};
