import {useSelector} from '../index';

export const useBalancesRecordSelector = () =>
    useSelector(
        ({wallet}) => wallet.balances.data,
        (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );

export const useUserAssetsSelector = () =>
    useSelector(
        ({wallet}) => Object.keys(wallet.balances.data),
        (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );

export const useAssetBalanceSelector = (address: string) =>
    useSelector(({wallet}) => wallet.balances.data[address] ?? '0');

export const usePendingSwapTransactionSelector = () =>
    useSelector(({wallet}) => wallet.pendingSwapTransaction);
