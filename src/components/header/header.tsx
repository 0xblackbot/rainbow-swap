import {LogoText} from './assets/LogoText';
import {HeaderContainer} from './header-container/header-container';
import styles from './header.module.css';
import {PointsScore} from './points-score/points-score';
import {WalletMenu} from './wallet-menu/wallet-menu';
import {IS_TMA} from '../../globals';
import {trackButtonClick} from '../../hooks/use-analytics.hook';
import {useOpenTonConnectModal} from '../../hooks/use-open-ton-connect-modal.hook';
import {useWalletAddress} from '../../hooks/use-wallet-address.hook';

export const Header = () => {
    const walletAddress = useWalletAddress();
    const openTonConnectModal = useOpenTonConnectModal();

    const handleConnect = () => {
        trackButtonClick('Header Connect');
        openTonConnectModal();
    };

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
                {IS_TMA && <PointsScore />}
                {walletAddress ? (
                    <WalletMenu walletAddress={walletAddress} />
                ) : (
                    <button
                        className={styles.connect_button}
                        onClick={handleConnect}
                    >
                        Connect
                    </button>
                )}
            </div>
        </HeaderContainer>
    );
};
