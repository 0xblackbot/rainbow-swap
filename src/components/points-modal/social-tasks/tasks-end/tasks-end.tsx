import styles from './tasks-end.module.css';
import {LottieWithSuspense} from '../../../lottie/lottie-with-suspense';

export const TasksEnd = () => (
    <div className={styles.container}>
        <LottieWithSuspense
            src="/animations/duck-clap.lottie"
            className={styles.duck_alert_fallback}
        />
        <p>That's it, more coming soon!</p>
    </div>
);
