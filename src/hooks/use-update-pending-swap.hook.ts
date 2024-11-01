import {isDefined} from '@rnw-community/shared';
import {useEffect} from 'react';

import {SwapStatusEnum} from '../enums/swap-status.enum';
import {INIT_DATA, UNSAFE_INIT_DATA} from '../globals';
import {useDispatch} from '../store';
import {useWalletAddressRef} from './use-wallet-address.hook';
import {
    loadBalancesActions,
    loadWalletDataActions,
    setPendingSwapAction,
    setPendingSwapHistoryDataAction
} from '../store/wallet/wallet-actions';
import {usePendingBocHashSelector} from '../store/wallet/wallet-selectors';
import {getSwapHistoryData} from '../utils/api.utils';
import {showSuccessToast} from '../utils/toast.utils';

const CHECK_INTERVAL = 3000;

export const useUpdatePendingSwap = () => {
    const dispatch = useDispatch();
    const bocHash = usePendingBocHashSelector();
    const walletAddressRef = useWalletAddressRef();

    useEffect(() => {
        if (bocHash) {
            const intervalId = setInterval(async () => {
                const historyData = await getSwapHistoryData({bocHash});

                dispatch(setPendingSwapHistoryDataAction(historyData));

                // completed
                if (historyData.status !== SwapStatusEnum.Pending) {
                    dispatch(setPendingSwapAction(undefined));

                    if (isDefined(walletAddressRef.current)) {
                        dispatch(
                            loadBalancesActions.submit(walletAddressRef.current)
                        );
                        dispatch(
                            loadWalletDataActions.submit({
                                address: walletAddressRef.current,
                                initData: INIT_DATA,
                                refParent: UNSAFE_INIT_DATA.refParent
                            })
                        );
                    }

                    showSuccessToast('Swap completed');
                }
            }, CHECK_INTERVAL);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [bocHash, dispatch, walletAddressRef]);
};
