import styles from './Header.module.css';
import {useTonUIHooks} from '../../hooks/useTonUIHooks/useTonUIHooks';

export const Header = () => {
    const {wallet, connectWallet, disconnectWallet} = useTonUIHooks();

    return (
        <div className={styles.header_div}>
            <div className={styles.logo_div}>
                <img
                    src="triangle-logo.png"
                    alt="1"
                    className={styles.header_triangle_logo}
                ></img>
                <img
                    src="logo.png"
                    alt="1"
                    className={styles.header_logo}
                ></img>
            </div>
            {wallet ? (
                <button
                    onClick={disconnectWallet}
                    className={styles.disconnect_button}
                >
                    Disconnect
                </button>
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
