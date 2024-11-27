import styles from './farm-volume.module.css';
import {useSwapForm} from '../../../../contexts/swap-form/swap-form.hook';
import {TON, USDT} from '../../../../globals';
import {LottieWithSuspense} from '../../../lottie/lottie-with-suspense';

const BADGE_URL = 'https://society.ton.org/the-open-league-new-year-airdrop';
const TON_INPUT_AMOUNT = '20';

export const FarmVolume = () => {
    const {setInputAssetAddress, setOutputAssetAddress, setInputAssetAmount} =
        useSwapForm();

    const handleBadgeClick = () => window.Telegram.WebApp.openLink(BADGE_URL);

    const handleFarmVolumeClick = () => {
        setInputAssetAddress(TON);
        setOutputAssetAddress(USDT);
        setInputAssetAmount(TON_INPUT_AMOUNT);
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>Farm $1,500,000 Airdrop</p>
            <div className={styles.inner_container}>
                <div className={styles.list_container}>
                    <div className={styles.message_container}>
                        <p className={styles.message}>1</p>
                        <p className={styles.button} onClick={handleBadgeClick}>
                            Get free badge
                        </p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.message}>2</p>
                        <p
                            className={styles.button}
                            onClick={handleFarmVolumeClick}
                        >
                            Swap any tokens
                        </p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.message}>3</p>
                        <p
                            className={styles.button}
                            onClick={handleFarmVolumeClick}
                        >
                            More you swap - more you get
                        </p>
                    </div>
                </div>

                <div className={styles.animationContainer}>
                    <LottieWithSuspense
                        speed={0.8}
                        src="animations/duck-airdrop.lottie"
                        className={styles.duck_airdrop}
                    />
                </div>
            </div>
        </div>
    );
};
