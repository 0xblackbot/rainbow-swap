import {Suspense, lazy} from 'react';

import styles from './farm-volume.module.css';
import {IS_TMA, TELEGRAM_BOT_LINK, TON, USDT} from '../../../globals';
import {useSwapForm} from '../../../hooks/swap-form/swap-form.hook';
import {useDispatch} from '../../../store';
import {openPointsModal} from '../../../store/points/points-actions';
import {Skeleton} from '../../skeleton/skeleton';

const DuckAirdrop = lazy(() => import('./duck-airdrop/duck-airdrop'));

const DELEN_BADGE_URL = 'https://society.ton.org/degen-airdrop';
const TON_INPUT_AMOUNT = '20';

export const FarmVolume = () => {
    const dispatch = useDispatch();
    const {setInputAssetAddress, setOutputAssetAddress, setInputAssetAmount} =
        useSwapForm();

    const handleDegenBadgeClick = () =>
        window.Telegram.WebApp.openLink(DELEN_BADGE_URL);

    const handleFarmVolumeClick = () => {
        setInputAssetAddress(TON);
        setOutputAssetAddress(USDT);
        setInputAssetAmount(TON_INPUT_AMOUNT);
    };

    const handleEarnMorePointsClick = () => dispatch(openPointsModal());
    const handleEarnPointsInTelegramClick = () =>
        window.Telegram.WebApp.openLink(TELEGRAM_BOT_LINK);

    return (
        <div className={styles.container}>
            <p className={styles.title}>Farm The Open League Airdrop</p>
            <div className={styles.inner_container}>
                <Suspense
                    fallback={
                        <Skeleton
                            isLoading={true}
                            className={styles.duck_airdrop_fallback}
                        />
                    }
                >
                    <DuckAirdrop />
                </Suspense>
                <div className={styles.list_container}>
                    <div className={styles.message_container}>
                        <p className={styles.message}>1. </p>
                        <p
                            className={styles.button}
                            onClick={handleDegenBadgeClick}
                        >
                            Get Degen badge
                        </p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.message}>2. </p>
                        <p
                            className={styles.button}
                            onClick={handleFarmVolumeClick}
                        >
                            Swap any tokens
                        </p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.message}>3. </p>
                        {IS_TMA ? (
                            <p
                                className={styles.button}
                                onClick={handleEarnMorePointsClick}
                            >
                                Earn more points
                            </p>
                        ) : (
                            <p
                                className={styles.button}
                                onClick={handleEarnPointsInTelegramClick}
                            >
                                More points in Telegram
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
