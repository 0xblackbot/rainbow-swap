import {useEffect} from 'react';

import {IS_TMA} from '../globals';
import {useThemeSelector} from '../store/settings/settings-selectors';

export const useThemeStyles = () => {
    const theme = useThemeSelector();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);

        const computedStyle = getComputedStyle(document.documentElement);
        const bgColor = computedStyle.getPropertyValue('--bg-color').trim();

        let themeMetaTag = document.querySelector('meta[name="theme-color"]');
        if (!themeMetaTag) {
            themeMetaTag = document.createElement('meta');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            themeMetaTag.name = 'theme-color';
            document.head.appendChild(themeMetaTag);
        }
        themeMetaTag.setAttribute('content', bgColor);

        if (IS_TMA) {
            window.Telegram.WebApp.setHeaderColor(bgColor);
            window.Telegram.WebApp.setBackgroundColor(bgColor);
            window.Telegram.WebApp.setBottomBarColor(bgColor);
        }
    }, [theme]);
};
