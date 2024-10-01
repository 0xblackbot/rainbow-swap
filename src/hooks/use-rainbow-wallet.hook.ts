import {isDefined} from '@rnw-community/shared';
import {Address} from '@ton/core';
import {useTonWallet} from '@tonconnect/ui-react';
import {
    CalculatedSwapRoute,
    getIsActivationRequired,
    getRainbowWalletActivationMessages
} from 'rainbow-swap-sdk';
import {useEffect, useMemo} from 'react';
import {toast} from 'react-toastify';

import {trackButtonClick} from './use-analytics.hook';
import {useSendTransaction} from './use-send-transaction.hook';
import {useDispatch} from '../store';
import {addPendingActivationTransactionActions} from '../store/wallet/wallet-actions';
import {
    useIsRainbowWalletActiveSelector,
    usePendingActivationTransactionSelector
} from '../store/wallet/wallet-selectors';
import {showLoadingToast, showSuccessToast} from '../utils/toast.utils';

export const useRainbowWallet = (swapRoutes: CalculatedSwapRoute[]) => {
    const dispatch = useDispatch();

    const wallet = useTonWallet();
    const sendTransaction = useSendTransaction();

    const isRainbowWalletActive = useIsRainbowWalletActiveSelector();
    const pendingActivationTransaction =
        usePendingActivationTransactionSelector();

    const isRequired = useMemo(
        () => getIsActivationRequired(swapRoutes, isRainbowWalletActive.data),
        [swapRoutes, isRainbowWalletActive.data]
    );

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
        const messages = getRainbowWalletActivationMessages(
            senderAddress.toString()
        );

        const transactionInfo = await sendTransaction(messages);

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
