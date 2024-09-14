import Lottie from 'lottie-react';

import duckAirdropAnimation from './duck-airdrop.json';
import styles from './farm-volume.module.css';
import {TON, USDT} from '../../../globals';
import {useSwapForm} from '../../../hooks/swap-form/swap-form.hook';

const DELEN_BADGE_URL = 'https://society.ton.org/degen-airdrop';
const TON_INPUT_AMOUNT = '200';

export const FarmVolume = () => {
    const {setInputAssetAddress, setOutputAssetAddress, setInputAssetAmount} =
        useSwapForm();

    const handleDegenBadgeClick = () =>
        window.Telegram.WebApp.openLink(DELEN_BADGE_URL);

    const handleFarmVolumeClick = () => {
        setInputAssetAddress(TON);
        setOutputAssetAddress(USDT);
        setInputAssetAmount(TON_INPUT_AMOUNT);
    };

    const handleTryArbitrageModeClick = () => {
        setInputAssetAddress(TON);
        setOutputAssetAddress(TON);
        setInputAssetAmount(TON_INPUT_AMOUNT);
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>Farm The Open League Airdrop</p>
            <div className={styles.inner_container}>
                <Lottie
                    loop={true}
                    animationData={duckAirdropAnimation}
                    className={styles.animation_container}
                />
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
                            Farm trading volume
                        </p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.message}>3. </p>
                        <p
                            className={styles.button}
                            onClick={handleTryArbitrageModeClick}
                        >
                            Try arbitrage mode
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
