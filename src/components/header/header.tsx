import {useTonAddress, useTonConnectModal} from '@tonconnect/ui-react';

import {LogoText} from './assets/LogoText';
import styles from './header.module.css';
import {WalletMenu} from './wallet-menu/wallet-menu.tsx';
import {HeaderContainer} from '../header-container/header-container.tsx';

export const Header = () => {
    const walletAddress = useTonAddress();
    const connectModal = useTonConnectModal();

    const handleConnect = () => connectModal.open();

    return (
        <HeaderContainer>
            <div className={styles.logo_div}>
                <img
                    className={styles.header_triangle_logo}
                    src="./icons/icon-128x128.png"
                ></img>
                <LogoText
                    className={styles.logo_text}
                    width="64px"
                    height="25px"
                ></LogoText>
            </div>
            {walletAddress === '' ? (
                <button
                    className={styles.connect_button}
                    onClick={handleConnect}
                >
                    Connect
                </button>
            ) : (
                <WalletMenu walletAddress={walletAddress} />
            )}
        </HeaderContainer>
    );
};
