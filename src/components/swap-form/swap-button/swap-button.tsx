import {isDefined} from '@rnw-community/shared';
import {Asset} from 'rainbow-swap-sdk';
import {FC} from 'react';

import {useModals} from '../../../contexts/modals/modals.hook';
import {
    trackButtonClick,
    trackSwapConfirmation
} from '../../../hooks/use-analytics.hook';
import {useSendTransaction} from '../../../hooks/use-send-transaction.hook';
import {FormButton} from '../../../shared/form-button/form-button';
import {useDispatch} from '../../../store';
import {
    useSwapDisplayDataSelector,
    useExpectedMessageCountSelector,
    useSwapMessagesSelector
} from '../../../store/swap-routes/swap-routes-selectors';
import {setPendingSwapAction} from '../../../store/wallet/wallet-actions';
import {showErrorToast, showSuccessToast} from '../../../utils/toast.utils';

interface Props {
    inputAsset: Asset;
    outputAsset: Asset;
}

export const SwapButton: FC<Props> = ({inputAsset, outputAsset}) => {
    const modal = useModals();
    const dispatch = useDispatch();
    const sendTransaction = useSendTransaction();

    const swapMessages = useSwapMessagesSelector();
    const expectedMessageCount = useExpectedMessageCountSelector();
    const swapDisplayData = useSwapDisplayDataSelector();

    const handleClick = async () => {
        if (swapMessages.length === 0) {
            return showErrorToast('Swap route not found. Please try again.');
        }

        trackButtonClick('Confirm'); // used old name for analytics
        const transactionInfo = await sendTransaction(swapMessages);

        if (isDefined(transactionInfo)) {
            trackSwapConfirmation({
                walletAddress: transactionInfo.senderRawAddress,
                bocHash: transactionInfo.bocHash,
                usdValue: swapDisplayData.inputAssetUsdAmount,
                inputAssetAddress: inputAsset.address,
                inputAssetSymbol: inputAsset.symbol,
                inputAssetAmount: swapDisplayData.inputAssetAmount,
                outputAssetAddress: outputAsset.address,
                outputAssetSymbol: outputAsset.symbol,
                outputAssetAmount: swapDisplayData.outputAssetAmount
            });

            dispatch(
                setPendingSwapAction({
                    bocHash: transactionInfo.bocHash,
                    expectedMessageCount
                })
            );
            modal.openHistoryModal();
            showSuccessToast('Swap sent, please wait...');
        }
    };

    return <FormButton text="Swap" onClick={handleClick} />;
};
