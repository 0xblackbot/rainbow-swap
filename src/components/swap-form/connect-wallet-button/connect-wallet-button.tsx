import {FC} from 'react';

import {trackButtonClick} from '../../../hooks/use-analytics.hook';
import {useOpenTonConnectModal} from '../../../hooks/use-open-ton-connect-modal.hook';
import {FormButton} from '../../../shared/form-button/form-button';

interface Props {
    onClick: () => void;
}

export const ConnectWalletButton: FC<Props> = ({onClick}) => {
    const openTonConnectModal = useOpenTonConnectModal();

    const handleClick = () => {
        trackButtonClick('Connect');
        openTonConnectModal();

        onClick();
    };

    return <FormButton text="Connect Wallet" onClick={handleClick} />;
};
