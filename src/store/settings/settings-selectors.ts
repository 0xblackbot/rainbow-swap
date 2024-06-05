import {useSelector} from '../index.ts';

export const useSlippageToleranceSelector = () =>
    useSelector(({settings}) => settings.slippageTolerance);
