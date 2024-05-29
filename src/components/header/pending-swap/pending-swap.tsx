import styles from './pending-swap.module.css';
import {usePendingSwapTransactionSelector} from '../../../store/wallet/wallet-selectors.ts';

export const PendingSwap = () => {
    const pendingSwapTransaction = usePendingSwapTransactionSelector();

    return (
        pendingSwapTransaction.data && (
            <a
                className={styles.container}
                href={`https://tonviewer.com/transaction/${pendingSwapTransaction.data?.bocHash}`}
                target="_blank"
                rel="noreferrer"
            >
                <div className={styles.loader_spinner} />
                <p className={styles.text}>1 swap</p>
            </a>
        )
    );
};
