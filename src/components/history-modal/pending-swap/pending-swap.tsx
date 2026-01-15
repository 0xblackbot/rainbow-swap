import {useMemo} from 'react';

import styles from './pending-swap.module.css';
import {ExternalLinkIcon} from '../../../assets/icons/ExternalLinkIcon/ExternalLinkIcon';
import {useExplorerLinks} from '../../../hooks/use-explorer-links.hook';
import {usePendingSwapSelector} from '../../../store/wallet/wallet-selectors';
import {clamp} from '../../../utils/number.utils';
import {Button} from '../../button/button';
import {LottieWithSuspense} from '../../lottie/lottie-with-suspense';
import {ProgressBar} from '../../progress-bar/progress-bar';

const MIN = 2;
const MAX = 98;

export const PendingSwap = () => {
    const pendingSwap = usePendingSwapSelector();
    const explorerLinks = useExplorerLinks();

    const progress = useMemo(() => {
        const value =
            pendingSwap.expectedMessageCount === 0
                ? 0
                : (100 * pendingSwap.historyData.completedMessageCount) /
                  pendingSwap.expectedMessageCount;

        return clamp(Math.floor(value), MIN, MAX);
    }, [
        pendingSwap.expectedMessageCount,
        pendingSwap.historyData.completedMessageCount
    ]);

    if (pendingSwap.bocHash) {
        const transactionHref = explorerLinks.getTransactionLink(
            pendingSwap.bocHash
        );

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
                <Button
                    size="xs"
                    mode="bezeled"
                    Component="a"
                    href={transactionHref}
                    target="_blank"
                >
                    <span>View in explorer</span>
                    <ExternalLinkIcon className={styles.link_icon} />
                </Button>
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
