import {FC} from 'react';

import {useDispatch} from '../../../store';
import {setMaxSplitsAction} from '../../../store/settings/settings-actions';
import {useMaxSplitsSelector} from '../../../store/settings/settings-selectors';
import {Button} from '../../button/button';

interface Props {
    value: number;
}

export const MaxSplitsButton: FC<Props> = ({value}) => {
    const dispatch = useDispatch();
    const maxSplits = useMaxSplitsSelector();

    const handleClick = () => dispatch(setMaxSplitsAction(value));

    return (
        <Button
            size="xs"
            mode={maxSplits === value ? 'bezeled' : 'gray'}
            onClick={handleClick}
        >
            <p>&nbsp;{value}&nbsp;</p>
        </Button>
    );
};
