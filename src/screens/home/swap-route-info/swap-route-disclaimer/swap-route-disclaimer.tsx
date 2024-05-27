import {FC} from 'react';

import styles from './swap-route-disclaimer.module.css';
import {AlertIcon} from '../../../../assets/icons/AlertIcon/AlertIcon';

export const SwapRouteDisclaimer: FC = () => {
    return (
        <>
            <div className={styles.container}>
                <AlertIcon width="16px" height="16px" />
                <p className={styles.header_text}>Disclaimer</p>
                <div />
                <p className={styles.text}>
                    This interface and the Rainbow Smart contract are provided
                    "as is", at your own risk, and without warranties of any
                    kind
                </p>
            </div>
        </>
    );
};
