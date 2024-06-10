import {isDefined} from '@rnw-community/shared';
import {Address} from '@ton/core';
import {useTonWallet} from '@tonconnect/ui-react';
import {FC, useCallback, useEffect, useState} from 'react';
import {toast} from 'react-toastify';

import styles from './swap-button.module.css';
import {BottomSheet} from '../../../../components/bottom-sheet/bottom-sheet.tsx';
import {trackButtonClick} from '../../../../hooks/use-analytics.hook.ts';
import {useSendTransaction} from '../../../../hooks/use-send-transaction.hook.ts';
import {FormButton} from '../../../../shared/FormButton/FormButton.tsx';
import {useDispatch} from '../../../../store';
import {useSlippageToleranceSelector} from '../../../../store/settings/settings-selectors.ts';
import {useSwapRoutesSelector} from '../../../../store/swap-routes/swap-routes-selectors.ts';
import {
    addPendingActivationTransactionActions,
    addPendingSwapTransactionActions
} from '../../../../store/wallet/wallet-actions.ts';
import {
    useIsRainbowWalletActiveSelector,
    usePendingActivationTransactionSelector
} from '../../../../store/wallet/wallet-selectors.ts';
import {
    getRainbowWalletActivationTransferParams,
    getSwapRouteTransferParams
} from '../../../../swap-routes/shared/transfer-params.utils.ts';
import {
    showLoadingToast,
    showSuccessToast
} from '../../../../utils/toast.utils.ts';
import {RainbowWalletInfo} from '../../swap-route-info/rainbow-wallet-info/rainbow-wallet-info.tsx';
import {SwapRouteDisclaimer} from '../../swap-route-info/swap-route-disclaimer/swap-route-disclaimer.tsx';
import {SwapRouteInfo} from '../../swap-route-info/swap-route-info.tsx';

interface Props {
    onSwap: () => void;
}

export const SwapButton: FC<Props> = ({onSwap}) => {
    const dispatch = useDispatch();
    const swapRoutes = useSwapRoutesSelector();
    const slippageTolerance = useSlippageToleranceSelector();
    const isRainbowWalletActive = useIsRainbowWalletActiveSelector();
    const pendingActivationTransaction =
        usePendingActivationTransactionSelector();

    const wallet = useTonWallet();
    const sendTransaction = useSendTransaction();

    const [isOpen, setIsOpen] = useState(false);

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

    const handleSwap = useCallback(() => {
        setIsOpen(true);
        onSwap();
    }, [setIsOpen, onSwap]);
    const handleClose = () => setIsOpen(false);

    const handleConfirm = async () => {
        trackButtonClick('Confirm');
        const senderAddress = Address.parse(wallet?.account.address ?? '');
        const transferParams = await Promise.all(
            swapRoutes.data.map(swapRoute =>
                getSwapRouteTransferParams(
                    swapRoute,
                    senderAddress,
                    slippageTolerance
                )
            )
        );

        const transactionInfo = await sendTransaction(
            transferParams,
            senderAddress
        );

        if (isDefined(transactionInfo)) {
            dispatch(addPendingSwapTransactionActions.submit(transactionInfo));
            showSuccessToast('Swap sent, please wait...');
            setIsOpen(false);
        }
    };
    const handleActivateContract = async () => {
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

    return (
        <>
            <FormButton text="Swap" onClick={handleSwap} />
            <BottomSheet
                isOpen={isOpen}
                headerTitle="Confirm the swap"
                onClose={handleClose}
            >
                <div className={styles.content_container}>
                    {!isRainbowWalletActive.data && <RainbowWalletInfo />}
                    <SwapRouteInfo />
                    <SwapRouteDisclaimer />
                    {isRainbowWalletActive.data ? (
                        <FormButton
                            text="Confirm"
                            containerClassName={styles.main_button}
                            onClick={handleConfirm}
                        ></FormButton>
                    ) : (
                        <FormButton
                            text="Activate contract"
                            containerClassName={styles.main_button}
                            onClick={handleActivateContract}
                        ></FormButton>
                    )}
                </div>
            </BottomSheet>
        </>
    );
};
