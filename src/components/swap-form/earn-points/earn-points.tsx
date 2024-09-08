import styles from './earn-points.module.css';
import {IS_TMA, TELEGRAM_BOT_LINK} from '../../../globals';
import {useDispatch} from '../../../store';
import {openPointsModal} from '../../../store/points/points-actions';

export const EarnPoints = () => {
    const dispatch = useDispatch();

    const handleClick = () => dispatch(openPointsModal());

    return null;
    return (
        <>
            {IS_TMA ? (
                <div className={styles.button_container} onClick={handleClick}>
                    <div className={styles.button_text_container}>
                        <p className={styles.button_text_1}>Tap to</p>
                        <p className={styles.button_text_2}>Earn</p>
                        <p className={styles.button_text_3}>points</p>
                    </div>
                </div>
            ) : (
                <a
                    className={styles.button_container}
                    href={TELEGRAM_BOT_LINK}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className={styles.button_text_container}>
                        <p className={styles.button_text_21}>Open</p>
                        <p className={styles.button_text_22}>Telegram</p>
                        <p className={styles.button_text_23}>Earn</p>
                        <p className={styles.button_text_24}>Points</p>
                    </div>
                </a>
            )}
        </>
    );
};
