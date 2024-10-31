import styles from './pending-swap.module.css';
import {useModals} from '../../../contexts/modals/modals.hook';
import {usePendingBocHashSelector} from '../../../store/wallet/wallet-selectors';
import {Button} from '../../button/button';

export const PendingSwap = () => {
    const modals = useModals();

    const pendingBocHash = usePendingBocHashSelector();

    const handleClick = () => modals.openHistoryModal();

    return (
        pendingBocHash && (
            <Button size="xs" mode="bezeled" onClick={handleClick}>
                <div className={styles.loader_spinner} />
                <span>1 swap</span>
            </Button>
        )
    );
};
