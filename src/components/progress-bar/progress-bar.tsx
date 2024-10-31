import {FC} from 'react';

import styles from './progress-bar.module.css';
import {getClassName} from '../../utils/style.utils';

interface Props {
    progress: number;
    className?: string;
}

export const ProgressBar: FC<Props> = ({progress, className = ''}) => (
    <div className={getClassName(styles.container, className)}>
        <div className={styles.fill} style={{width: `${progress}%`}} />
    </div>
);
