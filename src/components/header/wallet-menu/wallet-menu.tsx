import {useTonConnectUI} from '@tonconnect/ui-react';
import {FC, useMemo, useState} from 'react';

import styles from './wallet-menu.module.css';
import {useAnalytics} from '../../../hooks/use-analytics.hook';
import {useDisableMainButton} from '../../../hooks/use-disable-main-button.hook';
import {getClassName} from '../../../utils/style.utils';

interface Props {
    walletAddress: string;
}

export const WalletMenu: FC<Props> = ({walletAddress}) => {
    const [tonConnectUI] = useTonConnectUI();
    const {trackButtonClick} = useAnalytics();
    const [isOpen, setIsOpen] = useState(false);

    const shortWalletAddress = useMemo(
        () => walletAddress.slice(0, 4) + '...' + walletAddress.slice(-4),
        [walletAddress]
    );

    useDisableMainButton(isOpen);

    const handleMenuClick = () => {
        trackButtonClick('Header Menu');
        setIsOpen(value => !value);
    };
    const handleClose = () => {
        trackButtonClick('Header Menu Backdrop');
        setIsOpen(false);
    };
    const handleDisconnect = () => {
        trackButtonClick('Header Disconnect');
        tonConnectUI.disconnect();
        setIsOpen(false);
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
                    <button
                        className={getClassName(
                            styles.menu_explore_button,
                            styles.menu_button
                        )}
                    >
                        <a
                            className={styles.a_button}
                            href={`https://tonviewer.com/${walletAddress}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View in Explorer
                        </a>
                    </button>
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
