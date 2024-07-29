import styles from './earn-points.module.css';
import {useDispatch} from '../../../store';
import {openPointsModal} from '../../../store/points/points-actions';

export const EarnPoints = () => {
    const dispatch = useDispatch();

    const handleClick = () => dispatch(openPointsModal());

    return (
        <>
            <div className={styles.button_container} onClick={handleClick}>
                <div className={styles.button_text_container}>
                    <p className={styles.button_text_1}>Tap to</p>
                    <p className={styles.button_text_2}>Earn</p>
                    <p className={styles.button_text_3}>points</p>
                </div>
            </div>
        </>
    );
};
