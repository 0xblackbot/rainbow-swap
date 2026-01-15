import {useSelector} from '../index';

export const useIsAssetsInitializedSelector = () =>
    useSelector(({runtime}) => runtime.isAssetsInitialized);

export const useAssetsSearchValueSelector = () =>
    useSelector(({runtime}) => runtime.assetsSearchValue);
