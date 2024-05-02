import styles from './InputOutputSelector.module.css';
import {ArrowIcon} from '../../assets/icons/ArrowIcon/ArrowIcon';

export const InputOutputSelector = () => (
    <button className={styles.currency_selector_button}>
        <ArrowIcon />
    </button>
);
