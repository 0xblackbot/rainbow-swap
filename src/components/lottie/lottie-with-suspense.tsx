import {FC, Suspense, lazy} from 'react';

import {LottieProps} from './lottie.props';
import {BASE_URL} from '../../globals';
import {Skeleton} from '../skeleton/skeleton';

const Lottie = lazy(() => import('./lottie'));

export const LottieWithSuspense: FC<LottieProps> = ({src, className}) => (
    <Suspense fallback={<Skeleton isLoading={true} className={className} />}>
        <Lottie src={BASE_URL + src} className={className} />
    </Suspense>
);
