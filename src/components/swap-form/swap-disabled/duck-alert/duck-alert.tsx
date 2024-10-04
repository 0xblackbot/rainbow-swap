import Lottie from 'lottie-react';

import duckAlertAnimation from './duck-alert.json';
import styles from './duck-alert.module.css';

export default function DuckAlert() {
    return (
        <Lottie
            loop={true}
            animationData={duckAlertAnimation}
            className={styles.animation_container}
        />
    );
}
