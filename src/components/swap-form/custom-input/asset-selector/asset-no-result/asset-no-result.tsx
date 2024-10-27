import styles from './asset-no-result.module.css';
import {Lottie} from '../../../../lottie/lottie';

export const AssetNoResult = () => (
    <div className={styles.noResultDiv}>
        <Lottie
            src="/animations/duck-not-found.lottie"
            className={styles.duck_not_found_fallback}
        />
        <p>No assets found.</p>
    </div>
);
