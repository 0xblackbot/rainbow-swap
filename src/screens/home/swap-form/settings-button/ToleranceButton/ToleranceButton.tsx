import {FC} from 'react';

import {getClassName} from '../../../../../utils/style.utils';
import styles from '../settings-button.module.css';

interface Props {
    value: string;
    onClick: () => void;
    isSelected: boolean;
}

export const ToleranceButton: FC<Props> = ({value, onClick, isSelected}) => {
    return (
        <button
            className={getClassName(
                styles.tolerance_button,
                isSelected ? styles.tolerance_button_active : ''
            )}
            onClick={onClick}
        >
            <p> {value}% </p>
        </button>
    );
};
