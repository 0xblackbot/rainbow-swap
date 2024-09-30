import {isDefined} from '@rnw-community/shared';
import {memo, useEffect} from 'react';
import {ToastContainer} from 'react-toastify';

import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {PointsModal} from '../../components/points-modal/points-modal';
import {SwapScreen} from '../../components/swap-form/swap-form';
import {INIT_DATA, IS_TMA, UNSAFE_INIT_DATA} from '../../globals';
import {useTrackPageView} from '../../hooks/use-analytics.hook';
import {useWalletAddress} from '../../hooks/use-wallet-address.hook';
import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions';
import {
    closePointsModal,
    loadPointsActions
} from '../../store/points/points-actions';
import {loadAppStatusActions} from '../../store/security/security-actions';
import {
    addPendingActivationTransactionActions,
    addPendingSwapTransactionActions,
    checkIsRainbowWalletActiveActions,
    loadBalancesActions
} from '../../store/wallet/wallet-actions';
import {
    usePendingActivationTransactionSelector,
    usePendingSwapTransactionSelector
} from '../../store/wallet/wallet-selectors';

export const HomeScreen = memo(() => {
    const dispatch = useDispatch();
    const pendingSwapTransaction = usePendingSwapTransactionSelector();
    const pendingActivationTransaction =
        usePendingActivationTransactionSelector();

    const walletAddress = useWalletAddress();

    useTrackPageView('Home');

    useEffect(() => {
        dispatch(closePointsModal());
        dispatch(loadAppStatusActions.submit());
        dispatch(loadAssetsActions.submit());

        if (IS_TMA) {
            dispatch(
                loadPointsActions.submit({
                    initData: INIT_DATA,
                    refParent: UNSAFE_INIT_DATA.ref_parent
                })
            );
        }

        // restore waitTransactionConfirmation for swap & activation transactions
        if (isDefined(pendingSwapTransaction.data)) {
            dispatch(
                addPendingSwapTransactionActions.submit(
                    pendingSwapTransaction.data
                )
            );
        }

        if (isDefined(pendingActivationTransaction.data)) {
            dispatch(
                addPendingActivationTransactionActions.submit(
                    pendingActivationTransaction.data
                )
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (walletAddress) {
            // load wallet related data
            dispatch(loadBalancesActions.submit(walletAddress));
            dispatch(checkIsRainbowWalletActiveActions.submit(walletAddress));
        } else {
            // reset wallet related data
            dispatch(loadBalancesActions.success({}));
            dispatch(checkIsRainbowWalletActiveActions.success(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletAddress]);

    return (
        <>
            <ToastContainer
                position="top-center"
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                draggablePercent={40}
            />
            <Header />
            <SwapScreen />
            <PointsModal />
            <Footer />
        </>
    );
});
