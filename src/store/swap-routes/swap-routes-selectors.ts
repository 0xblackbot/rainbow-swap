import {mapSwapRouteToRoute} from 'rainbow-swap-sdk';
import {useMemo} from 'react';

import {useSelector} from '../index';

const useSwapRoutesSelector = () =>
    useSelector(
        ({swapRoutes}) => swapRoutes.bestRouteResponse.data.bestRoute,
        (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );

export const useRoutesSelector = () => {
    const swapRoutes = useSwapRoutesSelector();

    return useMemo(() => swapRoutes.map(mapSwapRouteToRoute), [swapRoutes]);
};

export const useIsRoutesLoadingSelector = () =>
    useSelector(({swapRoutes}) => swapRoutes.lastRequestId !== undefined);

export const useRoutingFeeSelector = () =>
    useSelector(({swapRoutes}) => swapRoutes.bestRouteResponse.data.routingFee);

export const useSwapMessagesSelector = () =>
    useSelector(
        ({swapRoutes}) => swapRoutes.bestRouteResponse.data.swapMessages
    );
