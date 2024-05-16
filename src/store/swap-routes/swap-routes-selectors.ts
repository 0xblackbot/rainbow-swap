import {useSelector} from '../index.ts';

export const useSwapRoutesSelector = () =>
    useSelector(({swapRoutes}) => swapRoutes.batch.data);
