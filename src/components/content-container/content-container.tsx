import {FC, PropsWithChildren} from 'react';

import styles from './content-container.module.css';

export const ContentContainer: FC<PropsWithChildren> = ({children}) => {
    return <div className={styles.container}>{children}</div>;
};
