import {DotLottieReact, DotLottie} from '@lottiefiles/dotlottie-react';
import {FC, useEffect, useState} from 'react';

import {LottieProps} from './lottie.props';
import {Skeleton} from '../skeleton/skeleton';

const Lottie: FC<LottieProps> = ({src, className}) => {
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

export default Lottie;
