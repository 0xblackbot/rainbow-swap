import {useEffect} from 'react';

export const usePreventScroll = (isOpen: boolean) => {
    useEffect(() => {
        const htmlElement = document.documentElement;
        const originalOverflowY = htmlElement.style.overflowY;

        if (isOpen) {
            htmlElement.style.overflow = 'hidden';
        }

        return () => {
            htmlElement.style.overflow = originalOverflowY;
        };
    }, [isOpen]);
};
