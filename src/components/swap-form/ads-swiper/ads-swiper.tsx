import {Pagination, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import './custom-swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import styles from './ads-swiper.module.css';
// import {EarnFees} from './earn-fees/earn-fees';
import {FarmVolume} from './farm-volume/farm-volume';
import {TradingCompetition} from './trading-competition/trading-competition';
import {getClassName} from '../../../utils/style.utils';

const AdsSwiper = () => (
    <Swiper
        className={styles.swiper}
        loop={true}
        autoplay={{delay: 10000}}
        speed={1400}
        effect="fade"
        spaceBetween={16}
        pagination={{clickable: true}}
        modules={[Pagination, Autoplay]}
    >
        <SwiperSlide
            className={getClassName(styles.swiperSlide, styles.swiperSlideBlue)}
        >
            <FarmVolume />
        </SwiperSlide>
        <SwiperSlide
            className={getClassName(styles.swiperSlide, styles.swiperSlidePink)}
        >
            <TradingCompetition />
        </SwiperSlide>
        {/*<SwiperSlide*/}
        {/*    className={getClassName(*/}
        {/*        styles.swiperSlide,*/}
        {/*        styles.swiperSlideGreen*/}
        {/*    )}*/}
        {/*>*/}
        {/*    <EarnFees />*/}
        {/*</SwiperSlide>*/}
    </Swiper>
);

export default AdsSwiper;
