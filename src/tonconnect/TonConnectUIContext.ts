import {TonConnectUI} from '@tonconnect/ui';
import {createContext} from 'react';

export const TonConnectUIContext = createContext<TonConnectUI | null>(null);
