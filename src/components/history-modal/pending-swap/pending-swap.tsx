import {useMemo} from 'react';

import styles from './pending-swap.module.css';
import {
    useExpectedMessageCountSelector,
    usePendingBocHashSelector,
    usePendingSwapHistoryDataSelector
} from '../../../store/wallet/wallet-selectors';
import {clamp} from '../../../utils/number.utils';
import {LottieWithSuspense} from '../../lottie/lottie-with-suspense';
import {ProgressBar} from '../../progress-bar/progress-bar';

const MIN = 2;
const MAX = 98;

export const PendingSwap = () => {
    const bocHash = usePendingBocHashSelector();
    const historyData = usePendingSwapHistoryDataSelector();

    const expectedMessageCount = useExpectedMessageCountSelector();

    const progress = useMemo(() => {
        const value =
            expectedMessageCount === 0
                ? 0
                : (100 * historyData.completedMessageCount) /
                  expectedMessageCount;

        return clamp(Math.floor(value), MIN, MAX);
    }, [expectedMessageCount, historyData.completedMessageCount]);

    if (bocHash) {
        return (
            <div className={styles.progress_container}>
                <LottieWithSuspense
                    speed={0.9}
                    src="animations/duck-chain.lottie"
                    className={styles.animation_container}
                />
                <ProgressBar
                    progress={progress}
                    className={styles.progress_bar}
                />
                <p className={styles.progress_description}>
                    Blockchain is processing your transaction
                    <br />
                    {progress}% completed
                </p>
            </div>
        );
    }

    return (
        <div className={styles.progress_container}>
            <LottieWithSuspense
                speed={0.7}
                src="animations/duck-chart.lottie"
                className={styles.animation_container}
            />
            <div className={styles.progress_bar} />
            <p className={styles.progress_description}>
                Your past token swap history
                <br />
                is available here
            </p>
        </div>
    );
};
