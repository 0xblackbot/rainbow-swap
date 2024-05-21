import {FC} from 'react';

import styles from './swap-route-disclaimer.module.css';
import {AlertIcon} from '../../../../assets/icons/AlertIcon/AlertIcon';

export const SwapRouteDisclaimer: FC = () => {
    return (
        <>
            <div className={styles.disclaimer_container}>
                <AlertIcon width="20px" height="20px" />
                <div className={styles.disclaimer_text}>
                    <p>Disclaimer</p>
                    <p>
                        Rainbow swap provides an interface to interact with ...?
                    </p>
                </div>
            </div>
        </>
    );
};
