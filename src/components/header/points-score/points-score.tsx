import styles from './points-score.module.css';

export const PointsScore = () => {
    return (
        <div className={styles.container}>
            <div className={styles.container_body}>
                <p className={styles.text}>0 points</p>
            </div>
        </div>
    );
};
