import {useTonConnectUI} from '@tonconnect/ui-react';
import {FC, useCallback, useMemo, useState} from 'react';

import styles from './wallet-menu.module.css';
import {DollarIcon} from '../../../assets/icons/DollarIcon/DollarIcon';
import {ExternalLinkIcon} from '../../../assets/icons/ExternalLinkIcon/ExternalLinkIcon';
import {AlertIcon} from '../../../assets/icons/LogoutIcon/LogoutIcon';
import {useOpenReferralsModal} from '../../../hooks/referrals-modal/referrals-modal.hook';
import {trackButtonClick} from '../../../hooks/use-analytics.hook';
import {useDisableMainButton} from '../../../hooks/use-disable-main-button.hook';
import {useEnableBackButton} from '../../../hooks/use-enable-back-button.hook';
import {getClassName} from '../../../utils/style.utils';

interface Props {
    walletAddress: string;
}

export const WalletMenu: FC<Props> = ({walletAddress}) => {
    const [tonConnectUI] = useTonConnectUI();
    const openReferralsModal = useOpenReferralsModal();

    const [isOpen, setIsOpen] = useState(false);

    const shortWalletAddress = useMemo(
        () => walletAddress.slice(0, 4) + '...' + walletAddress.slice(-4),
        [walletAddress]
    );

    const onClose = useCallback(() => setIsOpen(false), []);

    useDisableMainButton(isOpen);
    useEnableBackButton(isOpen, onClose);

    const handleMenuClick = () => {
        trackButtonClick('Header Menu');
        setIsOpen(value => !value);
    };
    const handleClose = () => {
        trackButtonClick('Header Menu Backdrop');
        onClose();
    };
    const handleEarnFeesClick = () => {
        trackButtonClick('Header Earn Fees');
        openReferralsModal();
        onClose();
    };
    const handleDisconnect = () => {
        trackButtonClick('Header Disconnect');
        tonConnectUI.disconnect();
        onClose();
    };

    return (
        <>
            <div
                className={getClassName(
                    styles.container,
                    isOpen ? styles.open : styles.close
                )}
            >
                <div className={styles.wallet_button} onClick={handleMenuClick}>
                    {shortWalletAddress}
                </div>

                <div className={styles.menu_content}>
                    <div
                        className={styles.menu_button}
                        onClick={handleEarnFeesClick}
                    >
                        <DollarIcon className={styles.menu_button_icon} />
                        Earn fees
                    </div>
                    <a
                        className={styles.menu_button}
                        href={`https://tonviewer.com/${walletAddress}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <ExternalLinkIcon className={styles.menu_button_icon} />
                        Explorer
                    </a>
                    <div
                        className={styles.menu_button}
                        onClick={handleDisconnect}
                    >
                        <AlertIcon className={styles.menu_button_icon} />
                        Disconnect
                    </div>
                </div>
            </div>

            <div
                className={getClassName(
                    styles.menu_backdrop,
                    isOpen ? styles.open : styles.close
                )}
                onClick={handleClose}
            ></div>
        </>
    );
};
