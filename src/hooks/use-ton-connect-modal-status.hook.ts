import {TonConnectUIContext} from '@tonconnect/ui-react';
import {useContext, useMemo} from 'react';

export const useTonConnectModalStatus = () => {
    const tonConnectUI = useContext(TonConnectUIContext);

    return useMemo(
        () => tonConnectUI?.modal.state.status,
        [tonConnectUI?.modal.state.status]
    );
};
