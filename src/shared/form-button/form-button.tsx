import {FC} from 'react';

import styles from './form-button.module.css';
import {IS_MAIN_BUTTON_AVAILABLE} from '../../globals';
import {MainButton} from './main-button/main-button';
import {MainButtonProps} from './main-button/main-button.props';

interface Props extends MainButtonProps {
    containerClassName?: string;
}

export const FormButton: FC<Props> = ({text, containerClassName, onClick}) => {
    if (IS_MAIN_BUTTON_AVAILABLE) {
        return <MainButton text={text} onClick={onClick} />;
    }

    return (
        <div className={containerClassName}>
            <button className={styles.button} onClick={onClick}>
                {text}
            </button>
        </div>
    );
};
