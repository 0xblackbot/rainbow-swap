import {useEffect, useState} from 'react';

/* eslint-disable @typescript-eslint/ban-ts-comment */
const getIsAvailable = () => {
    if (['ios', 'macos'].includes(window.Telegram.WebApp.platform)) {
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
