import {FC} from 'react';

import styles from './divider.module.css';
import {ChevronDoubleDownIcon} from '../../../../assets/icons/ChevronDoubleDownIcon/ChevronDoubleDownIcon';
import {getClassName} from '../../../../utils/style.utils';

interface Props {
    withArrow?: boolean;
    className?: string;
}

export const Divider: FC<Props> = ({withArrow = false, className = ''}) => (
    <div className={getClassName(styles.divider, className)}>
        {withArrow ? (
            <>
                <div className={styles.chunk} />
                <ChevronDoubleDownIcon className={styles.chevron} />
                <div className={styles.chunk} />
            </>
        ) : (
            <div className={styles.line} />
        )}
    </div>
);
