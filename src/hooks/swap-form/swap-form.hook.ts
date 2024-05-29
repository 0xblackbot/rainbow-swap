import {useContext} from 'react';

import {SwapFormContext} from './swap-form.context.ts';

export const useSwapForm = () => useContext(SwapFormContext);
