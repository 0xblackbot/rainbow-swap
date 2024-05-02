import styles from './Header.module.css';
import {useTonUIHooks} from '../../hooks/useTonUIHooks/useTonUIHooks';

export const Header = () => {
    const {wallet, connectWallet, disconnectWallet} = useTonUIHooks();

    return (
        <div className={styles.header_div}>
            <img src="logo.png" alt="1" className={styles.header_logo}></img>
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
