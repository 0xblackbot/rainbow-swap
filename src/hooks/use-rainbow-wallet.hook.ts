import {isDefined} from '@rnw-community/shared';
import {Address} from '@ton/core';
import {useTonAddress, useTonWallet} from '@tonconnect/ui-react';
import {useEffect, useMemo} from 'react';
import {toast} from 'react-toastify';

import {trackButtonClick} from './use-analytics.hook.ts';
import {useSendTransaction} from './use-send-transaction.hook.ts';
import {SwapRouteType} from '../enums/swap-route-type.enum.ts';
import {useDispatch} from '../store';
import {addPendingActivationTransactionActions} from '../store/wallet/wallet-actions.ts';
import {
    useIsRainbowWalletActiveSelector,
    usePendingActivationTransactionSelector
} from '../store/wallet/wallet-selectors.ts';
import {CalculatedSwapRoute} from '../swap-routes/shared/calculated-swap-route.type.ts';
import {getRainbowWalletActivationTransferParams} from '../swap-routes/shared/transfer-params.utils.ts';
import {showLoadingToast, showSuccessToast} from '../utils/toast.utils.ts';
import {updateBalances} from '../utils/update-balances.utils.ts';

export const useRainbowWallet = (swapRoutes: CalculatedSwapRoute[]) => {
    const dispatch = useDispatch();

    const wallet = useTonWallet();
    const walletAddress = useTonAddress();
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
                updateBalances(dispatch, walletAddress);
            };
        }
    }, [pendingActivationTransaction.data, dispatch, walletAddress]);

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
