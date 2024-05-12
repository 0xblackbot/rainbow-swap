import {useState} from 'react';

import logoText from './assets/logo-text.png';
import styles from './Header.module.css';
import {useTonUI} from '../../hooks/use-ton-ui.hook';
import {getClassName} from '../../utils/style.utils';

export const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {
        wallet,
        walletAddress,
        alteredWalletAddress,
        connectWallet,
        disconnectWallet
    } = useTonUI();

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <div className={styles.header_div}>
            <div className={styles.logo_div}>
                <img
                    src="icons/icon-128x128.png"
                    alt="1"
                    className={styles.header_triangle_logo}
                ></img>
                <img
                    src={logoText}
                    alt="1"
                    className={styles.header_logo}
                ></img>
            </div>
            {wallet ? (
                <div className={styles.dropdown}>
                    <button
                        onClick={toggleDropdown}
                        className={styles.disconnect_button}
                    >
                        {alteredWalletAddress}
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
                                onClick={disconnectWallet}
                            >
                                Disconnect
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={connectWallet}
                    className={styles.connect_button}
                >
                    Connect
                </button>
            )}
        </div>
    );
};
