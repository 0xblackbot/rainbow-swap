import {FC} from 'react';

import {Explorer} from '../../../../enums/explorer.enum';
import {useDispatch} from '../../../../store';
import {setExplorerAction} from '../../../../store/settings/settings-actions';
import {useExplorerSelector} from '../../../../store/settings/settings-selectors';
import {Button} from '../../../button/button';

interface Props {
    value: Explorer;
    title: string;
}

export const ExplorerButton: FC<Props> = ({value, title}) => {
    const dispatch = useDispatch();
    const explorer = useExplorerSelector();

    const handleClick = () => dispatch(setExplorerAction(value));

    return (
        <Button
            size="xs"
            mode={explorer === value ? 'bezeled' : 'gray'}
            onClick={handleClick}
        >
            <span>{title}</span>
        </Button>
    );
};
