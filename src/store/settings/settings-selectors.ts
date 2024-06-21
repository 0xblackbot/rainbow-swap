import {useSelector} from '../index';

export const useSlippageToleranceSelector = () =>
    useSelector(({settings}) => settings.slippageTolerance);
