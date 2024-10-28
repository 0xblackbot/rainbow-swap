import {TonConnectUIContext} from '@tonconnect/ui-react';
import {useContext, useEffect, useState} from 'react';

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
