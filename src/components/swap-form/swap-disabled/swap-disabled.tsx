import Lottie from 'lottie-react';
import {FC} from 'react';

import duckAlertAnimation from './duck-alert.json';
import styles from './swap-disabled.module.css';

interface Props {
    message: string;
}

export const SwapDisabled: FC<Props> = ({message}) => (
    <div className={styles.container}>
        <Lottie
            loop={true}
            animationData={duckAlertAnimation}
            className={styles.animation_container}
        />
        <p className={styles.message}>{message}</p>
    </div>
);
