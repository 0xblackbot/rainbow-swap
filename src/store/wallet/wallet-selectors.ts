import {useSelector} from '../index';

export const useBalancesSelector = () =>
    useSelector(
        ({wallet}) => wallet.balances.data,
        (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );

export const usePendingSwapTransactionSelector = () =>
    useSelector(({wallet}) => wallet.pendingSwapTransaction);

export const useIsRainbowWalletActiveSelector = () =>
    useSelector(({wallet}) => wallet.isRainbowWalletActive);

export const usePendingActivationTransactionSelector = () =>
    useSelector(({wallet}) => wallet.pendingActivationTransaction);
