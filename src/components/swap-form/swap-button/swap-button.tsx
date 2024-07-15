import {isDefined} from '@rnw-community/shared';
import {Address} from '@ton/core';
import {useTonWallet} from '@tonconnect/ui-react';
import {getSwapMessages} from 'rainbow-swap-sdk';
import {FC, useCallback, useState} from 'react';

import styles from './swap-button.module.css';
import {useSwapForm} from '../../../hooks/swap-form/swap-form.hook';
import {
    trackButtonClick,
    trackSwapConfirmation
} from '../../../hooks/use-analytics.hook';
import {useRainbowWallet} from '../../../hooks/use-rainbow-wallet.hook';
import {useSendTransaction} from '../../../hooks/use-send-transaction.hook';
import {BottomSheet} from '../../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../../shared/form-button/form-button';
import {useAssetsRecordSelector} from '../../../store/assets/assets-selectors';
import {useDispatch} from '../../../store/index';
import {useSlippageToleranceSelector} from '../../../store/settings/settings-selectors';
import {useSwapRoutesSelector} from '../../../store/swap-routes/swap-routes-selectors';
import {addPendingSwapTransactionActions} from '../../../store/wallet/wallet-actions';
import {showSuccessToast} from '../../../utils/toast.utils';
import {RainbowWalletInfo} from '../../swap-route-info/rainbow-wallet-info/rainbow-wallet-info';
import {SwapRouteDisclaimer} from '../../swap-route-info/swap-route-disclaimer/swap-route-disclaimer';
import {SwapRouteInfo} from '../../swap-route-info/swap-route-info';

interface Props {
    onSwap: () => void;
    outputAssetAmount: string;
}

export const SwapButton: FC<Props> = ({onSwap, outputAssetAmount}) => {
    const dispatch = useDispatch();
    const swapRoutes = useSwapRoutesSelector();
    const slippageTolerance = useSlippageToleranceSelector();
    const assets = useAssetsRecordSelector();
    const {inputAssetAddress, outputAssetAddress, inputAssetAmount} =
        useSwapForm();

    const wallet = useTonWallet();
    const sendTransaction = useSendTransaction();
    const rainbowWallet = useRainbowWallet(swapRoutes.data);

    const [isOpen, setIsOpen] = useState(false);

    const handleSwap = useCallback(() => {
        setIsOpen(true);
        onSwap();
    }, [setIsOpen, onSwap]);
    const handleClose = () => setIsOpen(false);

    const handleConfirm = async () => {
        trackButtonClick('Confirm');
        const senderAddress = Address.parse(wallet?.account.address ?? '');
        const messages = await getSwapMessages(
            senderAddress.toString(),
            swapRoutes.data,
            slippageTolerance
        );

        const transactionInfo = await sendTransaction(senderAddress, messages);

        if (isDefined(transactionInfo)) {
            const inputAsset = assets[inputAssetAddress];
            const outputAsset = assets[outputAssetAddress];

            const usdAmount =
                parseFloat(inputAssetAmount) *
                parseFloat(inputAsset.exchangeRate);

            trackSwapConfirmation(
                transactionInfo.bocHash,
                usdAmount,
                inputAsset,
                outputAsset,
                Number(outputAssetAmount) ?? 0
            );

            dispatch(addPendingSwapTransactionActions.submit(transactionInfo));
            showSuccessToast('Swap sent, please wait...');
            setIsOpen(false);
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
                    {rainbowWallet.isRequired && <RainbowWalletInfo />}
                    <SwapRouteInfo />
                    <SwapRouteDisclaimer />
                    {rainbowWallet.isRequired ? (
                        <FormButton
                            text="Activate contract"
                            containerClassName={styles.main_button}
                            onClick={rainbowWallet.activateContract}
                        ></FormButton>
                    ) : (
                        <FormButton
                            text="Confirm"
                            containerClassName={styles.main_button}
                            onClick={handleConfirm}
                        ></FormButton>
                    )}
                </div>
            </BottomSheet>
        </>
    );
};
