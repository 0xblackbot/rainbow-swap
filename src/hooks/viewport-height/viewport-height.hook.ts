import {useContext} from 'react';

import {ViewportHeightContext} from './viewport-height.context';

export const useViewportHeight = () => useContext(ViewportHeightContext);
