import Lottie from 'lottie-react';

import duckClapAnimation from './duck-clap.json';
import styles from './duck-clap.module.css';

export default function DuckClap() {
    return (
        <Lottie
            loop={true}
            animationData={duckClapAnimation}
            className={styles.animation_container}
        />
    );
}
