import styles from './points-score.module.css';
import {useDispatch} from '../../../store';
import {openPointsModal} from '../../../store/points/points-actions';

export const PointsScore = () => {
    const dispatch = useDispatch();

    const handleClick = () => dispatch(openPointsModal());

    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.container_body}>
                <p className={styles.text}>0 points</p>
            </div>
        </div>
    );
};
