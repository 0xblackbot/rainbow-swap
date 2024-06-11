import {FC} from 'react';

import styles from './rainbow-wallet-info.module.css';
import {InfoIcon} from '../../../../assets/icons/InfoIcon/InfoIcon.tsx';

export const RainbowWalletInfo: FC = () => (
    <>
        <div className={styles.container}>
            <div className={styles.header}>
                <InfoIcon className={styles.route_info_header_logo} />
                <p className={styles.header_text}>Action needed</p>
            </div>
            <p className={styles.text}>
                Press 'Activate contract' to deploy your smart contract. It's a
                one-time action. Once done, you can continue with your swap.
            </p>
        </div>
    </>
);
