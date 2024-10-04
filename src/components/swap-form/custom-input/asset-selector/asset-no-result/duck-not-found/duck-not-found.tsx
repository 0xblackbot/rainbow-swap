import Lottie from 'lottie-react';

import duckNotFoundAnimation from './duck-not-found.json';
import styles from './duck-not-found.module.css';

export default function DuckNotFound() {
    return (
        <Lottie
            loop={true}
            animationData={duckNotFoundAnimation}
            className={styles.animation_container}
        />
    );
}
