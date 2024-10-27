import {lazy, Suspense} from 'react';

import styles from './ads-swiper.module.css';
import {Skeleton} from '../../skeleton/skeleton';

const AdsSwiper = lazy(() => import('./ads-swiper'));

export const AdsSwiperWithSuspense = () => (
    <Suspense
        fallback={<Skeleton isLoading={true} className={styles.swiper} />}
    >
        <AdsSwiper />
    </Suspense>
);
