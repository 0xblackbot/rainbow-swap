import {useSelector} from '../index.ts';

export const useWalletSelector = () =>
    useSelector(({balances}) => balances.balances.data);

export const useIsProcessingSwapTransactionSelector = () =>
    useSelector(({balances}) => balances.pendingSwapTransaction.isLoading);
