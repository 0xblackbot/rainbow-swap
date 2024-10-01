import {isDefined} from '@rnw-community/shared';
import {Asset} from 'rainbow-swap-sdk';
import {FC} from 'react';

import {
    trackButtonClick,
    trackSwapConfirmation
} from '../../../hooks/use-analytics.hook';
import {useSendTransaction} from '../../../hooks/use-send-transaction.hook';
import {SwapInfo} from '../../../interfaces/swap-info.interface';
import {FormButton} from '../../../shared/form-button/form-button';
import {useDispatch} from '../../../store';
import {useSwapMessagesSelector} from '../../../store/swap-routes/swap-routes-selectors';
import {addPendingSwapTransactionActions} from '../../../store/wallet/wallet-actions';
import {showErrorToast, showSuccessToast} from '../../../utils/toast.utils';

interface Props {
    swapInfo: SwapInfo;
    inputAsset: Asset;
    outputAsset: Asset;
}

export const SwapButton: FC<Props> = ({swapInfo, inputAsset, outputAsset}) => {
    const dispatch = useDispatch();
    const sendTransaction = useSendTransaction();

    const swapMessages = useSwapMessagesSelector();

    const handleClick = async () => {
        if (swapMessages.length === 0) {
            return showErrorToast('Swap route not found. Please try again.');
        }

        trackButtonClick('Confirm'); // used old name for analytics
        const transactionInfo = await sendTransaction(swapMessages);

        if (isDefined(transactionInfo)) {
            const usdAmount =
                parseFloat(swapInfo.inputAssetAmount) *
                inputAsset.usdExchangeRate;

            trackSwapConfirmation({
                walletAddress: transactionInfo.senderRawAddress,
                bocHash: transactionInfo.bocHash,
                usdValue: usdAmount,
                inputAssetAddress: inputAsset.address,
                inputAssetSymbol: inputAsset.symbol,
                inputAssetAmount: Number(swapInfo.inputAssetAmount),
                outputAssetAddress: outputAsset.address,
                outputAssetSymbol: outputAsset.symbol,
                outputAssetAmount: Number(swapInfo.outputAssetAmount)
            });

            dispatch(addPendingSwapTransactionActions.submit(transactionInfo));
            showSuccessToast('Swap sent, please wait...');
        }
    };

    return <FormButton text="Swap" onClick={handleClick} />;
};
