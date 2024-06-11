import {isNotEmptyString} from '@rnw-community/shared';

import {loadBalancesActions} from '../store/wallet/wallet-actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateBalances = (dispatch: any, walletAddress: string) => {
    if (isNotEmptyString(walletAddress)) {
        dispatch(loadBalancesActions.submit(walletAddress));
    } else {
        dispatch(loadBalancesActions.success({}));
    }
};
