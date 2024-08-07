import {FC, PropsWithChildren} from 'react';

import styles from './task-item.module.css';

interface Props extends PropsWithChildren {
    imageSrc: string;
    title: string;
    description: string;
    onClick: () => void;
}

export const TaskItem: FC<Props> = ({
    imageSrc,
    title,
    description,
    children,
    onClick
}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <img src={imageSrc} alt={title} className={styles.image} />
            <div>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.childrenContainer}>{children}</div>
        </div>
    );
};
