import {isDefined} from '@rnw-community/shared';
import {Address} from '@ton/core';
import {useTonWallet} from '@tonconnect/ui-react';
import {useEffect, useMemo} from 'react';
import {toast} from 'react-toastify';

import {useAnalytics} from './use-analytics.hook';
import {useSendTransaction} from './use-send-transaction.hook';
import {SwapRouteType} from '../enums/swap-route-type.enum';
import {useDispatch} from '../store';
import {addPendingActivationTransactionActions} from '../store/wallet/wallet-actions';
import {
    useIsRainbowWalletActiveSelector,
    usePendingActivationTransactionSelector
} from '../store/wallet/wallet-selectors';
import {CalculatedSwapRoute} from '../swap-routes/shared/calculated-swap-route.type';
import {getRainbowWalletActivationTransferParams} from '../swap-routes/shared/transfer-params.utils';
import {showLoadingToast, showSuccessToast} from '../utils/toast.utils';

export const useRainbowWallet = (swapRoutes: CalculatedSwapRoute[]) => {
    const dispatch = useDispatch();
    const {trackButtonClick} = useAnalytics();
    const wallet = useTonWallet();
    const sendTransaction = useSendTransaction();

    const isRainbowWalletActive = useIsRainbowWalletActiveSelector();
    const pendingActivationTransaction =
        usePendingActivationTransactionSelector();

    const isRequired = useMemo(() => {
        const isRainbowContractCalled = swapRoutes.some(
            swapRoute => swapRoute.type === SwapRouteType.Rainbow
        );

        return isRainbowContractCalled && !isRainbowWalletActive.data;
    }, [swapRoutes, isRainbowWalletActive.data]);

    useEffect(() => {
        if (
            isRainbowWalletActive.isLoading ||
            pendingActivationTransaction.isLoading
        ) {
            window.Telegram.WebApp.MainButton.showProgress();

            return () => {
                window.Telegram.WebApp.MainButton.hideProgress();
            };
        }
    }, [
        isRainbowWalletActive.isLoading,
        pendingActivationTransaction.isLoading
    ]);

    useEffect(() => {
        if (isDefined(pendingActivationTransaction.data)) {
            const toastId = showLoadingToast(
                'Activation transaction sent, please wait...'
            );

            return () => {
                toast.dismiss(toastId);
                showSuccessToast('Success, you can do the swap.');
            };
        }
    }, [pendingActivationTransaction.data]);

    const activateContract = async () => {
        trackButtonClick('Activate contract');
        const senderAddress = Address.parse(wallet?.account.address ?? '');
        const transferParams = [
            getRainbowWalletActivationTransferParams(senderAddress)
        ];

        const transactionInfo = await sendTransaction(
            transferParams,
            senderAddress
        );

        if (isDefined(transactionInfo)) {
            dispatch(
                addPendingActivationTransactionActions.submit(transactionInfo)
            );
        }
    };

    return {
        isRequired,
        activateContract
    };
};
