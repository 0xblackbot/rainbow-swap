import {FC, Suspense, lazy} from 'react';

import {LottieProps} from './lottie.props';
import {Skeleton} from '../skeleton/skeleton';

const Lottie = lazy(() => import('./lottie'));

export const LottieWithSuspense: FC<LottieProps> = ({src, className}) => (
    <Suspense fallback={<Skeleton isLoading={true} className={className} />}>
        <Lottie src={src} className={className} />
    </Suspense>
);
