import {useTonAddress} from '@tonconnect/ui-react';
import {useCallback, useEffect, useRef} from 'react';

import {REFRESH_ROUTE_INTERVAL} from '../globals.ts';
import {useDispatch} from '../store/index.ts';
import {loadSwapRoutesActions} from '../store/swap-routes/swap-routes-actions.ts';
import {updateBalances} from '../utils/update-balances.utils.ts';

export const useRefreshRoutes = (
    inputAssetAmount: string,
    nanoInputAssetAmount: string,
    inputAssetAddress: string,
    outputAssetAddress: string
) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const walletAddress = useTonAddress();
    const dispatch = useDispatch();

    const handleRefreshRoutes = useCallback(() => {
        if (inputAssetAmount !== '') {
            dispatch(
                loadSwapRoutesActions.submit({
                    inputAssetAmount: nanoInputAssetAmount,
                    inputAssetAddress,
                    outputAssetAddress
                })
            );
        }
        updateBalances(dispatch, walletAddress);
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
