import {useEffect, useState} from 'react';

/* eslint-disable @typescript-eslint/ban-ts-comment */
const getIsAvailable = () => {
    if (window.Telegram.WebApp.platform === 'ios') {
        return true;
    }

    if (
        window.Telegram.WebApp.platform === 'macos' &&
        // @ts-ignore
        !window.Telegram.WebApp?.isFullscreen
    ) {
        return true;
    }

    // On Android devices MainButton text updates only after the touch
    return false;
};

export const useIsMainButtonAvailable = () => {
    const [isAvailable, setIsAvailable] = useState(getIsAvailable());

    useEffect(() => {
        // @ts-ignore
        window.Telegram.WebApp.onEvent('fullscreenChanged', () => {
            setIsAvailable(getIsAvailable());
        });
    }, []);

    return isAvailable;
};
