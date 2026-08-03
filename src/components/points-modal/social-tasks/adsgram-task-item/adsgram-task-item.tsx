import {useEffect, useRef, useState} from 'react';

import styles from './adsgram-task-item.module.css';
import {CheckmarkIcon} from '../../../../assets/icons/CheckmarkIcon/CheckmarkIcon';
import {DollarIcon} from '../../../../assets/icons/DollarIcon/DollarIcon';
import {INIT_DATA, UNSAFE_INIT_DATA} from '../../../../globals';
import {useWalletAddress} from '../../../../hooks/use-wallet-address.hook';
import {useDispatch} from '../../../../store';
import {loadWalletDataActions} from '../../../../store/wallet/wallet-actions';
import {useAdsGramRewardAvailableAtSelector} from '../../../../store/wallet/wallet-selectors';
import {showInfoToast} from '../../../../utils/toast.utils';
import {Button} from '../../../button/button';

const ADSGRAM_SDK_URL = 'https://sad.adsgram.ai/js/sad.min.js';
const ADSGRAM_TASK_ELEMENT = 'adsgram-task';
const ADSGRAM_TASK_BLOCK_ID = 'task-40770';
const WALLET_REFRESH_DELAYS = [1_000, 4_000, 10_000];
const MINUTE_MS = 60_000;

let adsGramSdkPromise: Promise<void> | undefined;

const loadAdsGramSdk = () => {
    if (customElements.get(ADSGRAM_TASK_ELEMENT)) {
        return Promise.resolve();
    }

    if (!adsGramSdkPromise) {
        adsGramSdkPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');

            script.src = ADSGRAM_SDK_URL;
            script.addEventListener(
                'load',
                () =>
                    customElements
                        .whenDefined(ADSGRAM_TASK_ELEMENT)
                        .then(() => resolve(), reject),
                {once: true}
            );
            script.addEventListener('error', () => reject(), {once: true});
            document.head.append(script);
        });
    }

    return adsGramSdkPromise;
};

const formatRemainingTime = (availableAt: number, now: number) => {
    const totalMinutes = Math.max(
        1,
        Math.ceil((availableAt - now) / MINUTE_MS)
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) {
        return `${minutes}m`;
    }

    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
};

export const AdsGramTaskItem = () => {
    const dispatch = useDispatch();
    const eventsRef = useRef<HTMLDivElement>(null);
    const walletAddress = useWalletAddress();
    const rewardAvailableAt = useAdsGramRewardAvailableAtSelector();
    const [isSdkReady, setIsSdkReady] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const [now, setNow] = useState(() => Date.now());

    const isCooldownActive =
        rewardAvailableAt !== null && rewardAvailableAt > now;

    useEffect(() => {
        if (!isCooldownActive) {
            return;
        }

        const timer = window.setInterval(() => setNow(Date.now()), 1_000);

        return () => window.clearInterval(timer);
    }, [isCooldownActive, rewardAvailableAt]);

    useEffect(() => {
        const eventsContainer = eventsRef.current;

        if (!eventsContainer) {
            return;
        }

        const refreshTimers: number[] = [];
        const handleReward = () => {
            if (!walletAddress) {
                return;
            }

            for (const delay of WALLET_REFRESH_DELAYS) {
                refreshTimers.push(
                    window.setTimeout(
                        () =>
                            dispatch(
                                loadWalletDataActions.submit({
                                    address: walletAddress,
                                    initData: INIT_DATA,
                                    refParent: UNSAFE_INIT_DATA.refParent
                                })
                            ),
                        delay
                    )
                );
            }
        };
        const handleUnavailable = () => setIsAvailable(false);
        const handleTooLongSession = () => {
            setIsAvailable(false);
            showInfoToast('Please reopen the app to load new tasks');
        };

        eventsContainer.addEventListener('reward', handleReward);
        eventsContainer.addEventListener('onError', handleUnavailable);
        eventsContainer.addEventListener('onBannerNotFound', handleUnavailable);
        eventsContainer.addEventListener(
            'onTooLongSession',
            handleTooLongSession
        );

        return () => {
            for (const timer of refreshTimers) {
                window.clearTimeout(timer);
            }
            eventsContainer.removeEventListener('reward', handleReward);
            eventsContainer.removeEventListener('onError', handleUnavailable);
            eventsContainer.removeEventListener(
                'onBannerNotFound',
                handleUnavailable
            );
            eventsContainer.removeEventListener(
                'onTooLongSession',
                handleTooLongSession
            );
        };
    }, [dispatch, walletAddress]);

    useEffect(() => {
        if (isCooldownActive) {
            return;
        }

        let isMounted = true;

        loadAdsGramSdk().then(
            () => isMounted && setIsSdkReady(true),
            () => isMounted && setIsAvailable(false)
        );

        return () => {
            isMounted = false;
        };
    }, [isCooldownActive]);

    if (!isAvailable) {
        return null;
    }

    return (
        <div ref={eventsRef} className={styles.eventsContainer}>
            {isCooldownActive && rewardAvailableAt !== null ? (
                <div className={styles.cooldownTask}>
                    <span className={styles.cooldownIcon}>
                        <DollarIcon width={24} height={24} />
                    </span>
                    <div className={styles.cooldownText}>
                        <p className={styles.cooldownTitle}>Task complete</p>
                        <p className={styles.cooldownDescription}>
                            New ad in{' '}
                            {formatRemainingTime(rewardAvailableAt, now)}
                        </p>
                    </div>
                    <span className={styles.cooldownStatus}>
                        <CheckmarkIcon />
                    </span>
                </div>
            ) : isSdkReady ? (
                <adsgram-task
                    className={styles.task}
                    data-block-id={ADSGRAM_TASK_BLOCK_ID}
                >
                    <span slot="reward" className={styles.reward}>
                        +250 XP
                    </span>
                    <Button
                        Component="span"
                        slot="button"
                        size="xs"
                        mode="bezeled"
                        className={styles.action}
                    >
                        Start
                    </Button>
                    <Button
                        Component="span"
                        slot="claim"
                        size="xs"
                        mode="bezeled"
                        className={styles.action}
                    >
                        Claim
                    </Button>
                    <span slot="done" className={styles.done}>
                        <CheckmarkIcon />
                    </span>
                </adsgram-task>
            ) : null}
        </div>
    );
};
