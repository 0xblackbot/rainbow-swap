import styles from './farm-volume.module.css';
import {LottieWithSuspense} from '../../../lottie/lottie-with-suspense';

export const FarmVolume = () => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>
                The Open League New Year Special <br />
                Airdrop is coming!
            </p>
            <div className={styles.inner_container}>
                <div className={styles.list_container}>
                    <div className={styles.message_container}>
                        <p className={styles.button}>
                            $1,500,000 airdrop for users
                        </p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.button}>November 27th...</p>
                    </div>
                </div>

                <div className={styles.animationContainer}>
                    <LottieWithSuspense
                        speed={0.8}
                        src="animations/duck-airdrop.lottie"
                        className={styles.duck_airdrop}
                    />
                </div>
            </div>
        </div>
    );
};
