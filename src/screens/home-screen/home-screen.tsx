import {memo, useEffect} from 'react';
import {ToastContainer} from 'react-toastify';

import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {SwapScreen} from '../../components/swap-form/swap-form';
import {ModalsProvider} from '../../contexts/modals/modals.provider';
import {SwapFormProvider} from '../../contexts/swap-form/swap-form.provider';
import {INIT_DATA, IS_TMA, UNSAFE_INIT_DATA} from '../../globals';
import {useTrackPageView} from '../../hooks/use-analytics.hook';
import {useUpdateAssetsList} from '../../hooks/use-update-assets-list.hook';
import {useUpdatePendingSwap} from '../../hooks/use-update-pending-swap.hook';
import {useWalletAddress} from '../../hooks/use-wallet-address.hook';
import {useDispatch} from '../../store';
import {
    loadUserAuthActions,
    loadWalletPointsActions
} from '../../store/points/points-actions';
import {loadBalancesActions} from '../../store/wallet/wallet-actions';
import {emptyWalletPoints} from '../../types/get-wallet-points.type';

export const HomeScreen = memo(() => {
    const dispatch = useDispatch();

    const walletAddress = useWalletAddress();

    useTrackPageView('Home');
    useUpdateAssetsList();
    useUpdatePendingSwap();

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
            // save new user
            IS_TMA &&
                dispatch(
                    loadUserAuthActions.submit({
                        initData: INIT_DATA,
                        refParent: UNSAFE_INIT_DATA.refParent
                    })
                );

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
