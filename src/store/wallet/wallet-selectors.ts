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

export const usePendingBocHashSelector = () =>
    useSelector(({wallet}) => wallet.pendingSwap.bocHash);

export const usePendingSwapResultSelector = () =>
    useSelector(({wallet}) => wallet.pendingSwap.result);

export const usePendingParsedTraceSelector = () =>
    useSelector(({wallet}) => wallet.pendingSwap.parsedTrace);

export const useExpectedMessageCountSelector = () =>
    useSelector(({wallet}) => wallet.pendingSwap.expectedMessageCount);
