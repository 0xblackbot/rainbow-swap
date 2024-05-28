import {FC, useEffect, useMemo} from 'react';

import styles from './FormButton.module.css';
import {useIsTMA} from '../../hooks/is-tma.hook.ts';

interface Props {
    text: string;
    containerClassName?: string;
    onClick: () => void;
}

export const FormButton: FC<Props> = ({text, containerClassName, onClick}) => {
    const isTMA = useIsTMA();

    const prevMainButtonText = useMemo(
        () => window.Telegram.WebApp.MainButton.text,
        []
    );

    useEffect(() => {
        window.Telegram.WebApp.MainButton.setText(text);
        window.Telegram.WebApp.MainButton.onClick(onClick);

        return () => {
            window.Telegram.WebApp.MainButton.setText(prevMainButtonText);
            window.Telegram.WebApp.MainButton.offClick(onClick);
        };
    }, [text, onClick, prevMainButtonText]);

    return (
        !isTMA && (
            <div className={containerClassName}>
                <button className={styles.button} onClick={onClick}>
                    {text}
                </button>
            </div>
        )
    );
};
