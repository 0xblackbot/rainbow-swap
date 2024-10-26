import {FC} from 'react';

import {IS_MAIN_BUTTON_AVAILABLE} from '../../globals';
import {MainButton} from './main-button/main-button';
import {MainButtonProps} from './main-button/main-button.props';
import {Button} from '../../components/button/button';

interface Props extends MainButtonProps {
    containerClassName?: string;
}

export const FormButton: FC<Props> = ({text, containerClassName, onClick}) => {
    if (IS_MAIN_BUTTON_AVAILABLE) {
        return <MainButton text={text} onClick={onClick} />;
    }

    return (
        <div className={containerClassName}>
            <Button size="l" mode="filled" stretched={true} onClick={onClick}>
                <span>{text}</span>
            </Button>
        </div>
    );
};
