import {useEffect} from 'react';

const DEFAULT_TEXT_COLOR = '#FFFFFF';
const DEFAULT_HINT_COLOR = '#96969d';

export const useDisableMainButton = (condition: boolean) => {
    useEffect(() => {
        if (condition) {
            const prevMainButtonColor = window.Telegram.WebApp.MainButton.color;
            const prevMainButtonTextColor =
                window.Telegram.WebApp.MainButton.textColor;
            window.Telegram.WebApp.MainButton.disable();
            window.Telegram.WebApp.MainButton.color = DEFAULT_HINT_COLOR;
            window.Telegram.WebApp.MainButton.textColor = DEFAULT_TEXT_COLOR;

            return () => {
                window.Telegram.WebApp.MainButton.enable();
                window.Telegram.WebApp.MainButton.color = prevMainButtonColor;
                window.Telegram.WebApp.MainButton.textColor =
                    prevMainButtonTextColor;
            };
        }
    }, [condition]);
};
