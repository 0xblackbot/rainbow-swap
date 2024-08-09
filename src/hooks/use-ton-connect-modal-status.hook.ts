import {TonConnectUIContext, WalletsModalState} from '@tonconnect/ui-react';
import {useContext, useEffect, useState} from 'react';

export const useTonConnectModalStatus = () => {
    const tonConnectUI = useContext(TonConnectUIContext);
    const [status, setStatus] = useState(tonConnectUI?.modal.state.status);

    useEffect(() => {
        if (tonConnectUI) {
            setStatus(tonConnectUI.modal.state.status);

            return tonConnectUI.onModalStateChange(
                (value: WalletsModalState) => {
                    setStatus(value.status);
                }
            );
        }
    }, [tonConnectUI]);

    return status;
};
