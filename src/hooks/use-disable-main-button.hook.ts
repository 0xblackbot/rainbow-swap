import {useEffect} from 'react';

const DEFAULT_HINT_COLOR = '#3e3e42';

export const useDisableMainButton = (condition: boolean) => {
    useEffect(() => {
        if (condition) {
            const prevMainButtonColor = window.Telegram.WebApp.MainButton.color;
            window.Telegram.WebApp.MainButton.disable();
            window.Telegram.WebApp.MainButton.color =
                window.Telegram.WebApp.themeParams.hint_color ??
                DEFAULT_HINT_COLOR;

            return () => {
                window.Telegram.WebApp.MainButton.enable();
                window.Telegram.WebApp.MainButton.color = prevMainButtonColor;
            };
        }
    }, [condition]);
};
