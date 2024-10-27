import {Suspense, lazy} from 'react';

import styles from './ads-swiper.module.css';
import {sleep} from '../../../utils/promise.utils';
import {Skeleton} from '../../skeleton/skeleton';

const AdsSwiper = lazy(() => sleep(5000).then(() => import('./ads-swiper')));

export const AdsSwiperWithSuspense = () => (
    <Suspense
        fallback={<Skeleton isLoading={true} className={styles.swiper} />}
    >
        <AdsSwiper />
    </Suspense>
);
