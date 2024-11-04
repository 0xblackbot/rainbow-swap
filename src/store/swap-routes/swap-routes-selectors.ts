import {useSelector} from '../index';

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

export const useSwapMessageCountSelector = () =>
    useSelector(
        ({swapRoutes}) => swapRoutes.bestRouteResponse.data.messageCount
    );
