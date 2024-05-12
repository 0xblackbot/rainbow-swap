import {useEffect, useRef, useState} from 'react';

export const useModalWidth = (modalWindowOpen: boolean) => {
    const [listWidth, setListWidth] = useState(0);
    const modalSheetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (modalSheetRef.current) {
                setListWidth(modalSheetRef.current.offsetWidth);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [modalWindowOpen]);

    return {listWidth, modalSheetRef};
};
