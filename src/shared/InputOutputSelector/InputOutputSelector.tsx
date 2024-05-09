import {FC} from 'react';

import styles from './InputOutputSelector.module.css';
import {ArrowIcon} from '../../assets/icons/ArrowIcon/ArrowIcon';

interface Props {
    onClick: () => void;
}
export const InputOutputSelector: FC<Props> = ({onClick}) => {
    return (
        <button className={styles.currency_selector_button} onClick={onClick}>
            <ArrowIcon />
        </button>
    );
};
