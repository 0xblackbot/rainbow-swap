import {createContext} from 'react';

import {useTooltip} from './use-tooltip.hook';

type ContextType = ReturnType<typeof useTooltip> | null;

export const TooltipContext = createContext<ContextType>(null);
