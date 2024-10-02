import {FC, useCallback} from 'react';

import {trackButtonClick} from '../../../hooks/use-analytics.hook';
import {useOpenTonConnectModal} from '../../../hooks/use-open-ton-connect-modal.hook';
import {FormButton} from '../../../shared/form-button/form-button';

interface Props {
    onClick: () => void;
}

export const ConnectWalletButton: FC<Props> = ({onClick}) => {
    const openTonConnectModal = useOpenTonConnectModal();

    const handleClick = useCallback(() => {
        trackButtonClick('Connect');
        openTonConnectModal();

        onClick();
    }, [onClick, openTonConnectModal]);

    return <FormButton text="Connect Wallet" onClick={handleClick} />;
};
