import {FC, Suspense, lazy} from 'react';

import {LottieProps} from './lottie.props';
import {Skeleton} from '../skeleton/skeleton';

const Lottie = lazy(() => import('./lottie'));

export const LottieWithSuspense: FC<LottieProps> = ({
    src,
    speed,
    className
}) => (
    <Suspense fallback={<Skeleton isLoading={true} className={className} />}>
        <Lottie src={src} speed={speed} className={className} />
    </Suspense>
);
