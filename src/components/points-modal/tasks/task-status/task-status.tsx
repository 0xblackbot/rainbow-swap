import {FC} from 'react';

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

    if (points > 0) {
        return <CheckmarkIcon />;
    }

    return <ChevronRightIcon />;
};
