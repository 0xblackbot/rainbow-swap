import {useTonConnectUI} from '@tonconnect/ui-react';
import {FC, useCallback, useMemo, useState} from 'react';

import styles from './wallet-menu.module.css';
import {trackButtonClick} from '../../../hooks/use-analytics.hook';
import {useDisableMainButton} from '../../../hooks/use-disable-main-button.hook';
import {useEnableBackButton} from '../../../hooks/use-enable-back-button.hook';
import {getClassName} from '../../../utils/style.utils';

interface Props {
    walletAddress: string;
}

export const WalletMenu: FC<Props> = ({walletAddress}) => {
    const [tonConnectUI] = useTonConnectUI();

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
    const handleDisconnect = () => {
        trackButtonClick('Header Disconnect');
        tonConnectUI.disconnect();
        onClose();
    };

    return (
        <>
            <div
                className={getClassName(
                    styles.wallet_button,
                    isOpen ? styles.open : styles.close
                )}
                onClick={handleMenuClick}
            >
                {shortWalletAddress}
                <div className={styles.menu_content}>
                    <a
                        className={getClassName(
                            styles.menu_explore_button,
                            styles.menu_button
                        )}
                        href={`https://tonviewer.com/${walletAddress}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View in Explorer
                    </a>
                    <button
                        className={getClassName(
                            styles.menu_disconnect_button,
                            styles.menu_button
                        )}
                        onClick={handleDisconnect}
                    >
                        Disconnect
                    </button>
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
