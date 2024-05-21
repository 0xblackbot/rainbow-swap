import {
    useTonAddress,
    useTonConnectModal,
    useTonConnectUI
} from '@tonconnect/ui-react';
import {useEffect, useMemo, useRef, useState} from 'react';

import logoText from './assets/logo-text.png';
import styles from './header.module.css';
import {getClassName} from '../../utils/style.utils';

export const Header = () => {
    const walletAddress = useTonAddress();
    const connectModal = useTonConnectModal();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [tonConnectUI] = useTonConnectUI();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const shortWalletAddress = useMemo(
        () => walletAddress.slice(0, 4) + '...' + walletAddress.slice(-4),
        [walletAddress]
    );

    const handleDropdownClick = () => setIsDropdownOpen(value => !value);
    const handleConnectClick = () => connectModal.open();
    const handleDisconnectClick = () => tonConnectUI.disconnect();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.header_div}>
            <div className={styles.logo_div}>
                <img
                    className={styles.header_triangle_logo}
                    src="./icons/icon-128x128.png"
                ></img>
                <img className={styles.header_logo} src={logoText}></img>
            </div>
            {walletAddress === '' ? (
                <button
                    onClick={handleConnectClick}
                    className={styles.connect_button}
                >
                    Connect
                </button>
            ) : (
                <div className={styles.dropdown} ref={dropdownRef}>
                    <button
                        onClick={handleDropdownClick}
                        className={styles.disconnect_button}
                    >
                        {shortWalletAddress}
                    </button>
                    {isDropdownOpen && (
                        <div className={styles.dropdown_content}>
                            <button
                                className={getClassName(
                                    styles.dropdown_explore_button,
                                    styles.dropdown_button
                                )}
                            >
                                <a
                                    href={`https://tonviewer.com/${walletAddress}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View in Explorer
                                </a>
                            </button>
                            <button
                                className={getClassName(
                                    styles.dropdown_disconnect_button,
                                    styles.dropdown_button
                                )}
                                onClick={handleDisconnectClick}
                            >
                                Disconnect
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
