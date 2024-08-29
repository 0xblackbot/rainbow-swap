import {FC} from 'react';

import styles from './task-header.module.css';

interface Props {
    name: string;
    imageSrc: string;
}

export const TaskHeader: FC<Props> = ({name, imageSrc}) => (
    <div className={styles.container}>
        <img src={imageSrc} alt={name} className={styles.image} />
        <p className={styles.name}>{name}</p>
    </div>
);
