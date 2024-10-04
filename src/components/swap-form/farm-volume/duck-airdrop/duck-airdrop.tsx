import Lottie from 'lottie-react';

import duckAirdropAnimation from './duck-airdrop.json';
import styles from './duck-airdrop.module.css';

export default function DuckAirdrop() {
    return (
        <Lottie
            loop={true}
            animationData={duckAirdropAnimation}
            className={styles.animation_container}
        />
    );
}
