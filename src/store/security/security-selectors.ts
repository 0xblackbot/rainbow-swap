import {useSelector} from '../index';

export const useAppStatusSelector = () =>
    useSelector(({security}) => security.appStatus.data);
