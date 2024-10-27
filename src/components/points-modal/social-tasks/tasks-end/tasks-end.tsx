import styles from './tasks-end.module.css';
import {Lottie} from '../../../lottie/lottie';

export const TasksEnd = () => (
    <div className={styles.container}>
        <Lottie
            src="/animations/duck-clap.lottie"
            className={styles.duck_alert_fallback}
        />
        <p>That's it, more coming soon!</p>
    </div>
);
