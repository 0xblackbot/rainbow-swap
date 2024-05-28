import {FC} from 'react';

import styles from './rainbow-wallet-info.module.css';
import {InfoIcon} from '../../../../assets/icons/InfoIcon/InfoIcon.tsx';

export const RainbowWalletInfo: FC = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <InfoIcon className={styles.route_info_header_logo} />
                    <p className={styles.header_text}>Action needed</p>
                </div>
                <p className={styles.text}>
                    Before your first swap on our DEX, you'll need to deploy
                    your own smart contract. This is a one-time transaction.
                    After that, you can proceed with your swap.
                </p>
            </div>
        </>
    );
};
