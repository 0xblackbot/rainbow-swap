import styles from './pending-swap.module.css';
import {useExplorerLinks} from '../../../hooks/use-explorer-links.hook';
import {usePendingSwapTransactionSelector} from '../../../store/wallet/wallet-selectors';

export const PendingSwap = () => {
    const pendingSwapTransaction = usePendingSwapTransactionSelector();
    const explorerLinks = useExplorerLinks();
    const href = explorerLinks.getTransactionLink(
        pendingSwapTransaction.data?.bocHash
    );

    return (
        pendingSwapTransaction.data && (
            <a
                className={styles.container}
                href={href}
                target="_blank"
                rel="noreferrer"
            >
                <div className={styles.loader_spinner} />
                <p className={styles.text}>1 swap</p>
            </a>
        )
    );
};
