import {FC} from 'react';

import styles from './FormButton.module.css';

interface Props {
    text: string;
    onClick: () => void;
}

export const FormButton: FC<Props> = ({text, onClick}) => (
    <button className={styles.button} onClick={onClick}>
        {text}
    </button>
);
