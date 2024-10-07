import {useMemo} from 'react';

import {TON, TON_DECIMALS} from '../../../globals';
import {useSwapForm} from '../../../hooks/swap-form/swap-form.hook';
import {useWalletAddress} from '../../../hooks/use-wallet-address.hook';
import {useSwapMessagesSelector} from '../../../store/swap-routes/swap-routes-selectors';
import {useAssetBalanceSelector} from '../../../store/wallet/wallet-selectors';
import {fromNano} from '../../../utils/big-int.utils';

export const useInputError = () => {
    const walletAddress = useWalletAddress();
    const {inputAssetAmount, inputAsset} = useSwapForm();

    const inputAssetBalance = useAssetBalanceSelector(inputAsset.address);

    const tonBalance = useAssetBalanceSelector(TON);
    const swapMessages = useSwapMessagesSelector();

    return useMemo(() => {
        if (!walletAddress) {
            return undefined;
        }

        if (parseFloat(inputAssetBalance) < parseFloat(inputAssetAmount)) {
            return `You don't have enough ${inputAsset.symbol}`;
        }

        let nanoTonSendAmount = 0n;

        for (const message of swapMessages) {
            nanoTonSendAmount += BigInt(message.amount);
        }

        const tonSendAmount = fromNano(nanoTonSendAmount, TON_DECIMALS);

        if (parseFloat(tonBalance) < parseFloat(tonSendAmount)) {
            return `Not enough TON to pay gas fees`;
        }

        return undefined;
    }, [
        walletAddress,
        inputAsset.symbol,
        inputAssetAmount,
        inputAssetBalance,
        swapMessages,
        tonBalance
    ]);
};
