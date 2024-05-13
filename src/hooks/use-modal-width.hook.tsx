import {useEffect, useRef, useState} from 'react';

import {clamp} from '../utils/math.utils.ts';

// Values from .App styles
const APP_MIN_WIDTH = 320;
const APP_MAX_WIDTH = 540;

export const useModalWidth = (modalWindowOpen: boolean) => {
    const [listWidth, setListWidth] = useState(0);
    const modalSheetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (modalSheetRef.current) {
                setListWidth(
                    clamp(
                        modalSheetRef.current.offsetWidth,
                        APP_MIN_WIDTH,
                        APP_MAX_WIDTH
                    )
                );
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
