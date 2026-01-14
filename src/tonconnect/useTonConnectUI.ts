import {useContext} from 'react';

import {TonConnectProviderNotSetError} from './errors/ton-connect-provider-not-set.error';
import {TonConnectUIContext} from './TonConnectUIContext';

export const useTonConnectUI = () => {
    const tonConnectUI = useContext(TonConnectUIContext);

    if (!tonConnectUI) {
        throw new TonConnectProviderNotSetError(
            'You should add <TonConnectUIProvider> on the top of the app to use TonConnect'
        );
    }

    return tonConnectUI;
};
