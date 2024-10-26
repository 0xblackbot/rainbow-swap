import styles from './points-score.module.css';
import {useDispatch} from '../../../store';
import {openPointsModal} from '../../../store/points/points-actions';
import {usePointsSelector} from '../../../store/points/points-selectors';

export const PointsScore = () => {
    const dispatch = useDispatch();
    const points = usePointsSelector();

    const handleClick = () => dispatch(openPointsModal());

    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.container_body}>
                <p className={styles.text}>{points} XP</p>
            </div>
        </div>
    );
};
