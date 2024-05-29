import {useSelector} from '../index.ts';

export const useBalancesSelector = () =>
    useSelector(({wallet}) => wallet.balances.data);

export const useIsProcessingSwapTransactionSelector = () =>
    useSelector(({wallet}) => wallet.pendingSwapTransaction.isLoading);

export const useIsRainbowWalletActiveSelector = () =>
    useSelector(({wallet}) => wallet.isRainbowWalletActive.data);
