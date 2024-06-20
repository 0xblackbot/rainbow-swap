import {FC} from 'react';

import styles from './toggle-assets-button.module.css';
import {ArrowUpDownIcon} from '../../../assets/icons/ArrowUpDownIcon/ArrowUpDownIcon.tsx';

interface Props {
    onClick: () => void;
}

export const ToggleAssetsButton: FC<Props> = ({onClick}) => (
    <button className={styles.currency_selector_button} onClick={onClick}>
        <ArrowUpDownIcon height="20px" width="20px" className={styles.icon} />
    </button>
);
