import {isNotEmptyString} from '@rnw-community/shared';
import {useTonAddress} from '@tonconnect/ui-react';
import {useEffect, useMemo, useRef} from 'react';

export const useWalletAddress = () => {
    const walletAddress = useTonAddress();

    return useMemo(
        () => (isNotEmptyString(walletAddress) ? walletAddress : undefined),
        [walletAddress]
    );
};

export const useWalletAddressRef = () => {
    const ref = useRef<string | undefined>(undefined);
    const walletAddress = useWalletAddress();

    useEffect(() => {
        ref.current = walletAddress;
    }, [walletAddress]);

    return ref;
};
