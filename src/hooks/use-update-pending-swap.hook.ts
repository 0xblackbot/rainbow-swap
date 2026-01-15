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
import {usePendingSwapSelector} from '../store/wallet/wallet-selectors';
import {getSwapHistoryData} from '../utils/api.utils';
import {sleep} from '../utils/promise.utils';
import {showSuccessToast} from '../utils/toast.utils';

const CHECK_INTERVAL = 3 * 1000;
const DEFAULT_CREATE_AT = 1734458968788; // Fallback value to remove initial stuck pending swaps
const PENDING_SWAP_STUCK_LIMIT = 10 * 60 * 1000; // 10 min

export const useUpdatePendingSwap = () => {
    const dispatch = useDispatch();
    const pendingSwap = usePendingSwapSelector();
    const walletAddressRef = useWalletAddressRef();

    useEffect(() => {
        const bocHash = pendingSwap.bocHash;

        if (bocHash) {
            const intervalId = setInterval(async () => {
                const createdAt = pendingSwap.createdAt ?? DEFAULT_CREATE_AT;

                // remove stucked pending swaps
                if (createdAt + PENDING_SWAP_STUCK_LIMIT < Date.now()) {
                    dispatch(setPendingSwapAction(undefined));
                    return;
                }

                const historyData = await getSwapHistoryData({bocHash});

                dispatch(setPendingSwapHistoryDataAction(historyData));

                // completed
                if (historyData.status !== SwapStatusEnum.Pending) {
                    dispatch(setPendingSwapAction(undefined));

                    if (isDefined(walletAddressRef.current)) {
                        await sleep(1000);
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
    }, [
        dispatch,
        pendingSwap.bocHash,
        pendingSwap.createdAt,
        walletAddressRef
    ]);
};
