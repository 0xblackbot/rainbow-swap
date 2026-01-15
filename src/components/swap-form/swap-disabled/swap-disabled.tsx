import {FC} from 'react';

import styles from './swap-disabled.module.css';
import {LottieWithSuspense} from '../../lottie/lottie-with-suspense';

interface Props {
    message: string;
}

export const SwapDisabled: FC<Props> = () => (
    <div className={styles.container}>
        <p className={styles.title}>Service temporary disabled</p>
        <div className={styles.inner_container}>
            <div className={styles.list_container}>
                <div className={styles.message_container}>
                    <p className={styles.button}>We are updating the serves</p>
                </div>
                <div className={styles.message_container}>
                    <p className={styles.button}>Wait a little bit, please</p>
                </div>
            </div>

            <div className={styles.animationContainer}>
                <LottieWithSuspense
                    speed={0.8}
                    src="animations/duck-alert.lottie"
                    className={styles.duck_airdrop}
                />
            </div>
        </div>
    </div>
);
