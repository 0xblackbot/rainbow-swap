import {useSelector} from '../index.ts';

export const useBalancesSelector = () =>
    useSelector(({wallet}) => wallet.balances.data);

export const usePendingSwapTransactionSelector = () =>
    useSelector(({wallet}) => wallet.pendingSwapTransaction);

export const useIsRainbowWalletActiveSelector = () =>
    useSelector(({wallet}) => wallet.isRainbowWalletActive);

export const usePendingActivationTransactionSelector = () =>
    useSelector(({wallet}) => wallet.pendingActivationTransaction);
