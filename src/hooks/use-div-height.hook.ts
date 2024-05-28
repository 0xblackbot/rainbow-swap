import {useEffect, useMemo, useRef, useState} from 'react';

export const useDivHeight = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => setHeight(ref.current?.offsetHeight ?? 0), []);

    return useMemo(
        () => ({
            height,
            ref
        }),
        [height]
    );
};
