import {FC, useEffect, useMemo} from 'react';
import terminal from 'virtual:terminal';

import styles from './FormButton.module.css';

interface Props {
    text: string;
    onClick: () => void;
}

export const FormButton: FC<Props> = ({text, onClick}) => {
    const prevMainButtonText = useMemo(
        () => window.Telegram.WebApp.MainButton.text,
        []
    );

    useEffect(() => {
        const handleClick = () => {
            terminal.log(text, 'button click');
            onClick();
        };

        window.Telegram.WebApp.MainButton.setText(text);
        window.Telegram.WebApp.MainButton.onClick(handleClick);

        return () => {
            window.Telegram.WebApp.MainButton.setText(prevMainButtonText);
            window.Telegram.WebApp.MainButton.offClick(handleClick);
        };
    }, [text, onClick, prevMainButtonText]);

    return (
        <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    );
};
