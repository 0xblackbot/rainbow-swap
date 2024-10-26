import {isDefined} from '@rnw-community/shared';
import {memo, useEffect} from 'react';
import {ToastContainer} from 'react-toastify';

import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {SwapScreen} from '../../components/swap-form/swap-form';
import {ModalsProvider} from '../../contexts/modals/modals.provider';
import {SwapFormProvider} from '../../contexts/swap-form/swap-form.provider';
import {INIT_DATA, UNSAFE_INIT_DATA} from '../../globals';
import {useTrackPageView} from '../../hooks/use-analytics.hook';
import {useWalletAddress} from '../../hooks/use-wallet-address.hook';
import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions';
import {loadWalletPointsActions} from '../../store/points/points-actions';
import {
    addPendingSwapTransactionActions,
    loadBalancesActions
} from '../../store/wallet/wallet-actions';
import {usePendingSwapTransactionSelector} from '../../store/wallet/wallet-selectors';
import {emptyWalletPoints} from '../../types/get-wallet-points.type';

export const HomeScreen = memo(() => {
    const dispatch = useDispatch();
    const pendingSwapTransaction = usePendingSwapTransactionSelector();

    const walletAddress = useWalletAddress();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (walletAddress) {
            // load wallet related data
            dispatch(loadBalancesActions.submit(walletAddress));
            dispatch(
                loadWalletPointsActions.submit({
                    address: walletAddress,
                    initData: INIT_DATA,
                    refParent: UNSAFE_INIT_DATA.refParent
                })
            );
        } else {
            // reset wallet related data
            dispatch(loadBalancesActions.success({}));
            dispatch(loadWalletPointsActions.success(emptyWalletPoints));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletAddress]);

    return (
        <ModalsProvider>
            <ToastContainer
                position="top-center"
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                draggablePercent={40}
            />
            <Header />
            <SwapFormProvider>
                <SwapScreen />
            </SwapFormProvider>
            <Footer />
        </ModalsProvider>
    );
});
