import {FC} from 'react';

import styles from './swap-route-disclaimer.module.css';
import {AlertIcon} from '../../../../assets/icons/AlertIcon/AlertIcon';

export const SwapRouteDisclaimer: FC = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <AlertIcon />
                    <p className={styles.header_text}>Disclaimer</p>
                </div>
                <p className={styles.text}>
                    This interface and the Rainbow Smart contract are provided
                    "as is", at your own risk, and without warranties of any
                    kind
                </p>
            </div>
        </>
    );
};
