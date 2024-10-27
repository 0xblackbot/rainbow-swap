import {FC} from 'react';

import styles from './swap-disabled.module.css';
import {Lottie} from '../../lottie/lottie';

interface Props {
    message: string;
}

export const SwapDisabled: FC<Props> = () => (
    <div className={styles.container}>
        <Lottie
            src="/animations/duck-alert.lottie"
            className={styles.duck_alert_fallback}
        />
        <div className={styles.list_container}>
            <p className={styles.title}>Attention</p>
            <p className={styles.message}>
                We are updating the serves, wait a little bit...
            </p>
        </div>
    </div>
);
