import {mapSwapRouteToRoute} from 'rainbow-swap-sdk';
import {useMemo} from 'react';

import {useSelector} from '../index';

export const useSwapRoutesSelector = () =>
    useSelector(
        ({swapRoutes}) => swapRoutes.batch.data,
        (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );

export const useRoutesSelector = () => {
    const swapRoutes = useSwapRoutesSelector();

    return useMemo(() => swapRoutes.map(mapSwapRouteToRoute), [swapRoutes]);
};

export const useIsRoutesLoadingSelector = () =>
    useSelector(({swapRoutes}) => swapRoutes.lastRequestId !== undefined);
