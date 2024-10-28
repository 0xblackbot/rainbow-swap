import styles from './asset-no-result.module.css';
import {LottieWithSuspense} from '../../../../lottie/lottie-with-suspense';

export const AssetNoResult = () => (
    <div className={styles.noResultDiv}>
        <LottieWithSuspense
            src="./animations/duck-not-found.lottie"
            className={styles.duck_not_found_fallback}
        />
        <p>No assets found.</p>
    </div>
);
