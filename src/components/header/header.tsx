import logoImage from './assets/icon.png';
import {LogoText} from './assets/LogoText';
import {HeaderContainer} from './header-container/header-container';
import styles from './header.module.css';
import {PointsScore} from './points-score/points-score';
import {WalletMenu} from './wallet-menu/wallet-menu';
import {trackButtonClick} from '../../hooks/use-analytics.hook';
import {useOpenTonConnectModal} from '../../hooks/use-open-ton-connect-modal.hook';
import {useWalletAddress} from '../../hooks/use-wallet-address.hook';
import {Button} from '../button/button';

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
                    src={logoImage}
                    alt="Rainbow Swap logo"
                ></img>
                <LogoText
                    className={styles.logo_text}
                    width="64px"
                    height="25px"
                ></LogoText>
            </div>

            <div className={styles.right_div}>
                <PointsScore />
                {walletAddress ? (
                    <WalletMenu walletAddress={walletAddress} />
                ) : (
                    <Button size="s" mode="filled" onClick={handleConnect}>
                        <span>Connect</span>
                    </Button>
                )}
            </div>
        </HeaderContainer>
    );
};
