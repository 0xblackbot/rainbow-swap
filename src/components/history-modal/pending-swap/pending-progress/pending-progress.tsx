import {useMemo} from 'react';

import styles from './pending-progress.module.css';
import {
    useExpectedMessageCountSelector,
    usePendingParsedTraceSelector
} from '../../../../store/wallet/wallet-selectors';
import {clamp} from '../../../../utils/number.utils';
import {LottieWithSuspense} from '../../../lottie/lottie-with-suspense';
import {ProgressBar} from '../../../progress-bar/progress-bar';

const MIN = 2;
const MAX = 98;

export const PendingProgress = () => {
    const expectedMessageCount = useExpectedMessageCountSelector();
    const parsedTrace = usePendingParsedTraceSelector();

    const progress = useMemo(() => {
        const value =
            expectedMessageCount === 0
                ? 0
                : (100 * parsedTrace.completedMessages) / expectedMessageCount;

        return clamp(Math.floor(value), MIN, MAX);
    }, [expectedMessageCount, parsedTrace.completedMessages]);

    return (
        <div className={styles.progress_container}>
            <LottieWithSuspense
                src="animations/duck-chain.lottie"
                className={styles.animation_container}
            />
            <ProgressBar progress={progress} className={styles.progress_bar} />
            <p className={styles.progress_description}>
                Blockchain is processing your transaction
                <br />
                {progress}% completed
            </p>
        </div>
    );
};
