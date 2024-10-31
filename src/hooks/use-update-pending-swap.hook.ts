import {isDefined} from '@rnw-community/shared';
import {useEffect} from 'react';

import {INIT_DATA, UNSAFE_INIT_DATA} from '../globals';
import {useDispatch} from '../store';
import {loadWalletPointsActions} from '../store/points/points-actions';
import {
    loadBalancesActions,
    setPendingSwapAction,
    setPendingSwapProgressAction
} from '../store/wallet/wallet-actions';
import {usePendingBocHashSelector} from '../store/wallet/wallet-selectors';
import {getSwapProgress} from '../utils/api.utils';

const CHECK_INTERVAL = 3000;

export const useUpdatePendingSwap = () => {
    const dispatch = useDispatch();
    const bocHash = usePendingBocHashSelector();

    useEffect(() => {
        if (bocHash) {
            const intervalId = setInterval(async () => {
                const swapProgress = await getSwapProgress({bocHash});

                dispatch(setPendingSwapProgressAction(swapProgress));

                // completed
                if (isDefined(swapProgress.onchain)) {
                    const walletAddress = swapProgress.onchain.walletAddress;

                    dispatch(setPendingSwapAction(undefined));
                    dispatch(loadBalancesActions.submit(walletAddress));
                    dispatch(
                        loadWalletPointsActions.submit({
                            address: walletAddress,
                            initData: INIT_DATA,
                            refParent: UNSAFE_INIT_DATA.refParent
                        })
                    );
                }
            }, CHECK_INTERVAL);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [bocHash, dispatch]);
};
