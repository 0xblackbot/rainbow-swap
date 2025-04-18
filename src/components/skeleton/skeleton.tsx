import {FC, PropsWithChildren} from 'react';

import styles from './skeleton.module.css';
import {getClassName} from '../../utils/style.utils';

interface Props extends PropsWithChildren {
    isLoading: boolean;
    className?: string;
}

export const Skeleton: FC<Props> = ({isLoading, className, children}) => (
    <div
        className={getClassName(
            className ?? '',
            isLoading ? styles.skeleton_loading : ''
        )}
    >
        {children}
    </div>
);
