import {useContext} from 'react';

import {ViewportHeightContext} from './viewport-height.context.ts';

export const useViewportHeight = () => useContext(ViewportHeightContext);
