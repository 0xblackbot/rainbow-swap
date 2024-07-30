import {isDefined, isNotEmptyString} from '@rnw-community/shared';
import {useTonAddress} from '@tonconnect/ui-react';
import {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';

import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {PointsModal} from '../../components/points-modal/points-modal';
import {SwapScreen} from '../../components/swap-form/swap-form';
import {useTrackPageView} from '../../hooks/use-analytics.hook';
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
import terminal from 'virtual:terminal';

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const pendingSwapTransaction = usePendingSwapTransactionSelector();
    const pendingActivationTransaction =
        usePendingActivationTransactionSelector();

    const walletAddress = useTonAddress();

    useTrackPageView('Home');

    useEffect(() => {
        const userId = window.Telegram.WebApp.initDataUnsafe.user?.id;
        const refParent = window.Telegram.WebApp.initDataUnsafe.start_param;

        terminal.log('userId', userId);
        terminal.log('refParent', refParent);
        terminal.log(window.Telegram.WebApp.initDataUnsafe);
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
            <PointsModal />
            <Footer />
        </>
    );
};
