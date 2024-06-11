import {isNotEmptyString} from '@rnw-community/shared';

import {AppDispatch} from '../store';
import {loadBalancesActions} from '../store/wallet/wallet-actions';

export const updateBalances = (
    dispatch: AppDispatch,
    walletAddress: string
) => {
    if (isNotEmptyString(walletAddress)) {
        dispatch(loadBalancesActions.submit(walletAddress));
    } else {
        dispatch(loadBalancesActions.success({}));
    }
};
