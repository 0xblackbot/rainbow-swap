import Lottie from 'lottie-react';

import styles from './asset-no-result.module.css';
import duckNotFoundAnimation from './duck-not-found.json';

export const AssetNoResult = () => (
    <div className={styles.noResultDiv}>
        <Lottie
            loop={true}
            animationData={duckNotFoundAnimation}
            className={styles.animation_container}
        />
        <p>No assets found.</p>
    </div>
);
