import {FC, PropsWithChildren} from 'react';

import styles from './content-container.module.css';
import {getClassName} from '../../utils/style.utils';

interface Props extends PropsWithChildren {
    className?: string;
}

export const ContentContainer: FC<Props> = ({className = '', children}) => {
    return (
        <div className={getClassName(styles.container, className)}>
            {children}
        </div>
    );
};
