import {FC} from 'react';

import styles from './task-status.module.css';
import {CheckmarkIcon} from '../../../../assets/icons/CheckmarkIcon/CheckmarkIcon';
import {ChevronRightIcon} from '../../../../assets/icons/ChevronRightIcon/ChevronRightIcon';
import {LoadingIcon} from '../../../../assets/icons/LoadingIcon/LoadingIcon';

interface Props {
    points: number;
    isLoading: boolean;
}

export const TaskStatus: FC<Props> = ({points, isLoading}) => {
    if (isLoading) {
        return <LoadingIcon />;
    }

    if (points === -1) {
        return <p className={styles.in_review}>In review</p>;
    }

    if (points > 0) {
        return <CheckmarkIcon />;
    }

    return <ChevronRightIcon className={styles.chevron_right} />;
};
