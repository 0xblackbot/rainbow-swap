import {useContext} from 'react';

import {AssetsContext} from './assets.context';

export const useAssetsContext = () => useContext(AssetsContext);
