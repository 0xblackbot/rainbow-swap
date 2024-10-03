import {mainButton} from '@telegram-apps/sdk';
import {useEffect} from 'react';

const DEFAULT_HINT_COLOR = '#3e3e42';

export const useDisableMainButton = (condition: boolean) => {
    useEffect(() => {
        if (condition) {
            // const prevMainButtonColor = window.Telegram.WebApp.MainButton.color;
            const prevMainButtonColor = mainButton.textColor;
            mainButton.setParams({
                isEnabled: false,
                textColor: DEFAULT_HINT_COLOR
            });
            // window.Telegram.WebApp.MainButton.disable();
            // window.Telegram.WebApp.MainButton.color =
            //     window.Telegram.WebApp.themeParams.hint_color ??
            //     DEFAULT_HINT_COLOR;

            return () => {
                mainButton.setParams({
                    isEnabled: true,
                    textColor: prevMainButtonColor as any
                });
                // window.Telegram.WebApp.MainButton.enable();
                // window.Telegram.WebApp.MainButton.color = prevMainButtonColor;
            };
        }
    }, [condition]);
};
