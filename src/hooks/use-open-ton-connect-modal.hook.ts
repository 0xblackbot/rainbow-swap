import {useCallback, useContext} from 'react';

import {TonConnectUIContext} from '../tonconnect/TonConnectUIContext';

export const useOpenTonConnectModal = () => {
    const tonConnectUI = useContext(TonConnectUIContext);

    return useCallback(() => tonConnectUI?.modal.open(), [tonConnectUI?.modal]);
};
