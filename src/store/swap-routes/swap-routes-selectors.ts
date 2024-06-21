import {useSelector} from '../index';

export const useSwapRoutesSelector = () =>
    useSelector(({swapRoutes}) => swapRoutes.batch);
