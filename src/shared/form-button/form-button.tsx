import {FC, useEffect} from 'react';

import {MainButton} from './main-button/main-button';
import {MainButtonProps} from './main-button/main-button.props';
import {Button} from '../../components/button/button';
import {useIsMainButtonAvailable} from '../../hooks/use-is-main-button-available.hook';

interface Props extends MainButtonProps {
    containerClassName?: string;
}

export const FormButton: FC<Props> = ({text, containerClassName, onClick}) => {
    const isMainButtonAvailable = useIsMainButtonAvailable();

    useEffect(() => {
        if (isMainButtonAvailable) {
            window.Telegram.WebApp.MainButton.show();
        } else {
            window.Telegram.WebApp.MainButton.hide();
        }
    }, [isMainButtonAvailable]);

    if (isMainButtonAvailable) {
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
