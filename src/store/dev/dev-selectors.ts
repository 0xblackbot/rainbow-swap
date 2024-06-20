import {useSelector} from '../index.ts';

export const useDevVersionSelector = () =>
    useSelector(({dev}) => dev.stateVersion);
