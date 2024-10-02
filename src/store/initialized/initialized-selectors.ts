import {useSelector} from '../index';

export const useIsAssetInitializedSelector = () =>
    useSelector(({initialized}) => initialized.assets);
