import {useEffect} from 'react';

import styles from './Header.module.css';
import {useAssetsHook} from '../../hooks/useAssetsHook.ts/useAssetsHook';
import {useTonUIHooks} from '../../hooks/useTonUIHooks/useTonUIHooks';

export const Header = () => {
    const {
        wallet,
        walletAddress,
        alteredWalletAddress,
        connectWallet,
        disconnectWallet
    } = useTonUIHooks();

    const {updateAssetsWithBalances} = useAssetsHook();

    useEffect(() => {
        updateAssetsWithBalances(walletAddress);
    }, [wallet]);

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
                    {alteredWalletAddress}
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
