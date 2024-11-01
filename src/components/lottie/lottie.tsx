import {DotLottieReact, DotLottie} from '@lottiefiles/dotlottie-react';
import {FC, useEffect, useState} from 'react';

import {LottieProps} from './lottie.props';
import {BASE_URL} from '../../globals';
import {Skeleton} from '../skeleton/skeleton';

const Lottie: FC<LottieProps> = ({src, speed, className}) => {
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
                src={BASE_URL + src}
                loop={true}
                autoplay={true}
                speed={speed}
                dotLottieRefCallback={setDotLottie}
            />
        </Skeleton>
    );
};

export default Lottie;
