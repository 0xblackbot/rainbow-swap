import {useTonAddress, useTonConnectModal} from '@tonconnect/ui-react';
import {useEffect} from 'react';

import {LogoText} from './assets/LogoText';
import styles from './header.module.css';
import {PendingSwap} from './pending-swap/pending-swap.tsx';
import {WalletMenu} from './wallet-menu/wallet-menu.tsx';
import {HeaderContainer} from '../header-container/header-container.tsx';

const DEFAULT_HINT_COLOR = '#3e3e42';

export const Header = () => {
    const walletAddress = useTonAddress();
    const connectModal = useTonConnectModal();

    const handleConnect = () => {
        connectModal.open();
    };

    useEffect(() => {
        if (connectModal.state.status === 'opened') {
            const prevMainButtonColor = window.Telegram.WebApp.MainButton.color;

            window.Telegram.WebApp.MainButton.disable();
            window.Telegram.WebApp.MainButton.color =
                window.Telegram.WebApp.themeParams.hint_color ??
                DEFAULT_HINT_COLOR;

            return () => {
                window.Telegram.WebApp.MainButton.enable();
                window.Telegram.WebApp.MainButton.color = prevMainButtonColor;
            };
        }
    }, [connectModal.state.status]);

    return (
        <HeaderContainer>
            <div className={styles.left_div}>
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

            <div className={styles.right_div}>
                <PendingSwap />
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
            </div>
        </HeaderContainer>
    );
};
