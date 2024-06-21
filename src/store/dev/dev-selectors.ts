import {useSelector} from '../index';

export const useDevVersionSelector = () =>
    useSelector(({dev}) => dev.stateVersion);
