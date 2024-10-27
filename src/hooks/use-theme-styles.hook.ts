import {useEffect} from 'react';

import {IS_TMA} from '../globals';
import {useThemeSelector} from '../store/settings/settings-selectors';

export const useThemeStyles = () => {
    const theme = useThemeSelector();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);

        if (IS_TMA) {
            const computedStyle = getComputedStyle(document.documentElement);
            const bgColor = computedStyle.getPropertyValue('--bg-color').trim();

            window.Telegram.WebApp.setHeaderColor(bgColor);
            window.Telegram.WebApp.setBackgroundColor(bgColor);
            window.Telegram.WebApp.setBottomBarColor(bgColor);
        }
    }, [theme]);
};
