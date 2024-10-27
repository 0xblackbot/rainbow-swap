import {FC} from 'react';

import {Theme} from '../../../../enums/theme.enum';
import {useDispatch} from '../../../../store';
import {setThemeAction} from '../../../../store/settings/settings-actions';
import {useThemeSelector} from '../../../../store/settings/settings-selectors';
import {Button} from '../../../button/button';

interface Props {
    value: Theme;
    title: string;
}

export const ThemeButton: FC<Props> = ({value, title}) => {
    const dispatch = useDispatch();
    const theme = useThemeSelector();

    const handleClick = () => dispatch(setThemeAction(value));

    return (
        <Button
            size="xs"
            mode={theme === value ? 'bezeled' : 'gray'}
            onClick={handleClick}
        >
            <span>{title}</span>
        </Button>
    );
};
