import {mapSwapRouteToRoute} from 'rainbow-swap-sdk';
import {useMemo} from 'react';

import {useSelector} from '../index';

export const useRoutesSelector = () => {
    const swapRoutes = useSelector(
        ({swapRoutes}) => swapRoutes.bestRouteResponse.data.bestRoute,
        (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );

    return useMemo(() => swapRoutes.map(mapSwapRouteToRoute), [swapRoutes]);
};

export const useIsRoutesLoadingSelector = () =>
    useSelector(({swapRoutes}) => swapRoutes.lastRequestId !== undefined);

export const useSwapMessagesSelector = () =>
    useSelector(
        ({swapRoutes}) => swapRoutes.bestRouteResponse.data.swapMessages
    );

export const useSwapDisplayDataSelector = () =>
    useSelector(
        ({swapRoutes}) => swapRoutes.bestRouteResponse.data.displayData
    );

export const useExpectedMessageCountSelector = () =>
    useSelector(
        ({swapRoutes}) => swapRoutes.bestRouteResponse.data.messageCount
    );
