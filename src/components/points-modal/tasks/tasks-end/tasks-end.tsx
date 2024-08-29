import Lottie from 'lottie-react';

import duckClapAnimation from './duck-clap.json';
import styles from './tasks-end.module.css';

export const TasksEnd = () => (
    <div className={styles.container}>
        <Lottie
            loop={true}
            animationData={duckClapAnimation}
            className={styles.animation_container}
        />
        <p>That's it, more coming soon!</p>
    </div>
);
