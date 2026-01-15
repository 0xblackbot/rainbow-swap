import styles from './pending-swap.module.css';
import {useModals} from '../../../contexts/modals/modals.hook';
import {usePendingSwapSelector} from '../../../store/wallet/wallet-selectors';
import {Button} from '../../button/button';

export const PendingSwap = () => {
    const modals = useModals();

    const pendingSwap = usePendingSwapSelector();

    const handleClick = () => modals.openHistoryModal();

    return (
        pendingSwap.bocHash && (
            <Button size="xs" mode="bezeled" onClick={handleClick}>
                <div className={styles.loader_spinner} />
                <span>1 swap</span>
            </Button>
        )
    );
};
