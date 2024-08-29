import styles from './divider.module.css';
import {ChevronDoubleDownIcon} from '../../../../assets/icons/ChevronDoubleDownIcon/ChevronDoubleDownIcon';

export const Divider = () => (
    <div className={styles.divider}>
        <div className={styles.chunk} />
        <ChevronDoubleDownIcon className={styles.chevron} />
        <div className={styles.chunk} />
    </div>
);
