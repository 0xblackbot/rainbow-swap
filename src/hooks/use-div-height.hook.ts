import {useEffect, useMemo, useRef, useState} from 'react';

export const useDivHeight = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) {
                setHeight(entries[0].contentRect.height);
            }
        });

        if (ref.current) {
            const target = ref.current;
            resizeObserver.observe(target);

            return () => {
                resizeObserver.unobserve(target);
            };
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
