import styles from './history-soon.module.css';
import {HistoryIcon} from '../../../../assets/icons/HistoryIcon/HistoryIcon';

export const HistorySoon = () => (
    <div className={styles.container}>
        <p>History will be available here soon</p>
        <HistoryIcon width={80} height={80} />
    </div>
);
