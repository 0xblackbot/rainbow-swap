import {FC} from 'react';

import styles from './divider.module.css';
import {ChevronDoubleDownIcon} from '../../../../assets/icons/ChevronDoubleDownIcon/ChevronDoubleDownIcon';

interface Props {
    withArrow?: boolean;
}

export const Divider: FC<Props> = ({withArrow = false}) => (
    <div className={styles.divider}>
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
