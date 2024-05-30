import {useEffect} from 'react';

import {DEFAULT_HINT_COLOR} from '../globals';

export const useDisableMainButton = (condition: unknown) => {
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
