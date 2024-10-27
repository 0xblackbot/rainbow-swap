import {DotLottieReact, DotLottie} from '@lottiefiles/dotlottie-react';
import {FC, useEffect, useState} from 'react';

import {Skeleton} from '../skeleton/skeleton';

interface Props {
    src: string;
    className?: string;
}

export const Lottie: FC<Props> = ({src, className}) => {
    const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const onLoad = () => setIsLoading(false);

        dotLottie?.addEventListener('load', onLoad);

        return () => {
            dotLottie?.removeEventListener('load', onLoad);
        };
    }, [dotLottie]);

    return (
        <Skeleton isLoading={isLoading} className={className}>
            <DotLottieReact
                src={src}
                loop={true}
                autoplay={true}
                dotLottieRefCallback={setDotLottie}
            />
        </Skeleton>
    );
};
