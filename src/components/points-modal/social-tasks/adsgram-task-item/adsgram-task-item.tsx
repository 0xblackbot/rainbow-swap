import {useEffect, useRef, useState} from 'react';

import styles from './adsgram-task-item.module.css';
import {INIT_DATA, isProd, UNSAFE_INIT_DATA} from '../../../../globals';
import {useWalletAddress} from '../../../../hooks/use-wallet-address.hook';
import {useDispatch} from '../../../../store';
import {loadWalletDataActions} from '../../../../store/wallet/wallet-actions';
import {useAdsGramRewardClaimedTodaySelector} from '../../../../store/wallet/wallet-selectors';
import {showInfoToast} from '../../../../utils/toast.utils';

const ADSGRAM_SDK_URL = 'https://sad.adsgram.ai/js/sad.min.js';
const ADSGRAM_TASK_ELEMENT = 'adsgram-task';
const ADSGRAM_TASK_BLOCK_ID = 'task-40770';
const WALLET_REFRESH_DELAYS = [1_000, 4_000];

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

export const AdsGramTaskItem = () => {
    const dispatch = useDispatch();
    const taskRef = useRef<HTMLElement>(null);
    const walletAddress = useWalletAddress();
    const rewardClaimedToday = useAdsGramRewardClaimedTodaySelector();
    const [isSdkReady, setIsSdkReady] = useState(
        customElements.get(ADSGRAM_TASK_ELEMENT) !== undefined
    );
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        let isMounted = true;

        loadAdsGramSdk().then(
            () => isMounted && setIsSdkReady(true),
            () => isMounted && setIsAvailable(false)
        );

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const task = taskRef.current;

        if (!task) {
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

        task.addEventListener('reward', handleReward);
        task.addEventListener('onError', handleUnavailable);
        task.addEventListener('onBannerNotFound', handleUnavailable);
        task.addEventListener('onTooLongSession', handleTooLongSession);

        return () => {
            for (const timer of refreshTimers) {
                window.clearTimeout(timer);
            }
            task.removeEventListener('reward', handleReward);
            task.removeEventListener('onError', handleUnavailable);
            task.removeEventListener('onBannerNotFound', handleUnavailable);
            task.removeEventListener('onTooLongSession', handleTooLongSession);
        };
    }, [dispatch, isSdkReady, walletAddress]);

    if (!isSdkReady || !isAvailable || rewardClaimedToday) {
        return null;
    }

    return (
        <adsgram-task
            ref={taskRef}
            className={styles.task}
            data-block-id={ADSGRAM_TASK_BLOCK_ID}
            data-debug={isProd ? undefined : 'true'}
            data-debug-console={isProd ? undefined : 'false'}
        >
            <span slot="reward" className={styles.reward}>
                +250 XP
            </span>
            <span slot="button" className={styles.action}>
                Start
            </span>
            <span slot="claim" className={styles.action}>
                Claim
            </span>
            <span slot="done" className={styles.done}>
                Done
            </span>
        </adsgram-task>
    );
};
