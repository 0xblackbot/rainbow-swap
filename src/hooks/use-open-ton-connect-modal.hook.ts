import {TonConnectUIContext} from '@tonconnect/ui-react';
import {useCallback, useContext} from 'react';

export const useOpenTonConnectModal = () => {
    const tonConnectUI = useContext(TonConnectUIContext);

    return useCallback(() => tonConnectUI?.modal.open(), [tonConnectUI?.modal]);
};
