import {isDefined, isNotEmptyString} from '@rnw-community/shared';
import {useTonAddress} from '@tonconnect/ui-react';
import {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';

import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {SwapScreen} from '../../components/swap-form/swap-form';
import {useAnalytics} from '../../hooks/use-analytics.hook';
import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions';
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

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const {useTrackPageView} = useAnalytics();
    const pendingSwapTransaction = usePendingSwapTransactionSelector();
    const pendingActivationTransaction =
        usePendingActivationTransactionSelector();

    const walletAddress = useTonAddress();

    useTrackPageView('Home');

    useEffect(() => {
        dispatch(loadAssetsActions.submit());

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
        if (isNotEmptyString(walletAddress)) {
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
            <Footer />
        </>
    );
};
