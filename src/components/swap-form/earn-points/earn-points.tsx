import styles from './earn-points.module.css';

export const EarnPoints = () => {
    return (
        <>
            <div className={styles.button_container}>
                <div className={styles.button_text_container}>
                    <p className={styles.button_text_1}>Tap to</p>
                    <p className={styles.button_text_2}>Earn</p>
                    <p className={styles.button_text_3}>points</p>
                </div>
            </div>
        </>
    );
};
