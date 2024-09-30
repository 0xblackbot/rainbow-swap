import {getQueryId} from 'rainbow-swap-sdk';
import {useCallback, useEffect, useRef} from 'react';

import {useWalletAddress} from './use-wallet-address.hook';
import {REFRESH_ROUTE_INTERVAL} from '../globals';
import {useDispatch} from '../store';
import {loadSwapRoutesActions} from '../store/swap-routes/swap-routes-actions';
import {loadBalancesActions} from '../store/wallet/wallet-actions';

export const useRefreshRoutes = (
    inputAssetAmount: string,
    nanoInputAssetAmount: string,
    inputAssetAddress: string,
    outputAssetAddress: string
) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const walletAddress = useWalletAddress();
    const dispatch = useDispatch();

    const handleRefreshRoutes = useCallback(() => {
        if (inputAssetAmount !== '') {
            dispatch(
                loadSwapRoutesActions.submit({
                    inputAssetAmount: nanoInputAssetAmount,
                    inputAssetAddress,
                    outputAssetAddress,
                    senderAddress: walletAddress,
                    requestId: getQueryId().toString()
                })
            );
        }
        if (walletAddress) {
            dispatch(loadBalancesActions.submit(walletAddress));
        } else {
            dispatch(loadBalancesActions.success({}));
        }
    }, [
        walletAddress,
        inputAssetAmount,
        nanoInputAssetAmount,
        inputAssetAddress,
        outputAssetAddress,
        dispatch
    ]);

    const startInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        const interval = setInterval(
            handleRefreshRoutes,
            REFRESH_ROUTE_INTERVAL
        );
        intervalRef.current = interval;
    }, [handleRefreshRoutes]);

    const stopInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const handleManualRefresh = useCallback(() => {
        stopInterval();
        handleRefreshRoutes();
        startInterval();
    }, [handleRefreshRoutes, startInterval, stopInterval]);

    useEffect(() => {
        if (inputAssetAmount !== '') {
            startInterval();
        } else {
            stopInterval();
        }

        return () => {
            stopInterval();
        };
    }, [inputAssetAmount, startInterval, stopInterval]);

    return {handleManualRefresh, intervalRef};
};
