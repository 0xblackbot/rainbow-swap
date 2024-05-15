import {useContext} from 'react';

import {SwapFormContext} from './swap-form.context';

export const useSwapFormBalance = () => useContext(SwapFormContext);
