import {useContext, useEffect, useState} from 'react';

import {TonConnectUIContext} from '../tonconnect/TonConnectUIContext';

export const useTonConnectModalStatus = () => {
    const tonConnectUI = useContext(TonConnectUIContext);
    const [status, setStatus] = useState(tonConnectUI?.modal.state.status);

    useEffect(() => {
        tonConnectUI?.onModalStateChange(value => {
            setStatus(value.status);
        });
    }, [tonConnectUI]);

    return status;
};
