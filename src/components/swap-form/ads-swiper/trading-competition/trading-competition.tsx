import {MouseEvent} from 'react';

import logoImage from './kuku.png';
import styles from './trading-competition.module.css';
import {useModals} from '../../../../contexts/modals/modals.hook';
import {useSwapForm} from '../../../../contexts/swap-form/swap-form.hook';
import {TON} from '../../../../globals';
import {Countdown} from '../../../countdown/countdown';

const PRIZE_POOL_USD_VALUE = '2,500';
const END_DATE = Date.UTC(2025, 1, 9, 24, 0, 0);
const TOKEN_SYMBOL = 'KUKU';
const TOKEN_ADDRESS = 'EQCDU9gNsGU71zFuAW498HV9JI4y01TknJpgtxvLPUanPkxR';

export const TradingCompetition = () => {
    const modals = useModals();
    const {setInputAssetAddress, setOutputAssetAddress, setInputAssetAmount} =
        useSwapForm();

    const handleClick = () => modals.openTradingCompetitionModal();

    const handleSwapClick = (e: MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation();
        setInputAssetAddress(TON);
        setOutputAssetAddress(TOKEN_ADDRESS);
        setInputAssetAmount('');
    };

    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.header_container}>
                <p className={styles.title}>
                    ${PRIZE_POOL_USD_VALUE} Trading Competition
                </p>
                <Countdown
                    date={END_DATE}
                    placeholder="Ended"
                    className={styles.title}
                />
            </div>
            <div className={styles.inner_container}>
                <div className={styles.list_container}>
                    <div className={styles.message_container}>
                        <p className={styles.message}>1</p>
                        <p className={styles.button} onClick={handleSwapClick}>
                            Trade {TOKEN_SYMBOL}
                        </p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.message}>2</p>
                        <p className={styles.button}>Track Your Rank</p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.message}>3</p>
                        <p className={styles.button}>Win Rewards</p>
                    </div>
                </div>

                <div className={styles.animationContainer}>
                    <img
                        src={logoImage}
                        className={styles.duck_airdrop}
                        alt="Trading competition"
                    />
                </div>
            </div>
        </div>
    );
};
