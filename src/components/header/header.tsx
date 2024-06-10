import {useTonAddress, useTonConnectModal} from '@tonconnect/ui-react';

import {LogoText} from './assets/LogoText';
import styles from './header.module.css';
import {PendingSwap} from './pending-swap/pending-swap.tsx';
import {WalletMenu} from './wallet-menu/wallet-menu.tsx';
import {trackButtonClick} from '../../hooks/use-analytics.hook.ts';
import {useDisableMainButton} from '../../hooks/use-disable-main-button.hook.ts';
import {HeaderContainer} from '../header-container/header-container.tsx';

export const Header = () => {
    const walletAddress = useTonAddress();
    const connectModal = useTonConnectModal();

    const handleConnect = () => {
        trackButtonClick('Header Connect');
        connectModal.open();
    };

    const isOpen = connectModal.state.status === 'opened';

    useDisableMainButton(isOpen);

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
