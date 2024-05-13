import {FC} from 'react';

import styles from './toggle-assets-button.module.css';
import {ArrowIcon} from '../../../../assets/icons/ArrowIcon/ArrowIcon.tsx';

interface Props {
    onClick: () => void;
}

export const ToggleAssetsButton: FC<Props> = ({onClick}) => (
    <button className={styles.currency_selector_button} onClick={onClick}>
        <ArrowIcon />
    </button>
);
