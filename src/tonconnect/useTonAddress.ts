import {CHAIN, toUserFriendlyAddress} from '@tonconnect/ui';
import {useMemo} from 'react';

import {useTonWallet} from './useTonWallet';

/**
 * Use it to get user's current ton wallet address. If wallet is not connected hook will return empty string.
 * @param [userFriendly=true] allows to choose format of the address.
 */
export function useTonAddress(userFriendly = true): string {
    const wallet = useTonWallet();
    return useMemo(() => {
        if (wallet) {
            return userFriendly
                ? toUserFriendlyAddress(
                      wallet.account.address,
                      wallet.account.chain === CHAIN.TESTNET
                  )
                : wallet.account.address;
        } else {
            return '';
        }
    }, [wallet, userFriendly]);
}
