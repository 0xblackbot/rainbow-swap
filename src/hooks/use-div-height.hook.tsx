import {useEffect, useMemo, useRef, useState} from 'react';

export const useDivHeight = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.offsetHeight);
        }
    }, []);

    return useMemo(
        () => ({
            height,
            ref
        }),
        [height]
    );
};
