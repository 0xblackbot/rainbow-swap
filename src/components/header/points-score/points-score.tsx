import styles from './points-score.module.css';
import {useModals} from '../../../contexts/modals/modals.hook';
import {useWalletAddress} from '../../../hooks/use-wallet-address.hook';
import {usePointsSelector} from '../../../store/wallet/wallet-selectors';

export const PointsScore = () => {
    const walletAddress = useWalletAddress();
    const modals = useModals();
    const points = usePointsSelector();

    const handleClick = () => modals.openPointsModal();

    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.container_body}>
                <p className={styles.text}>
                    {walletAddress && points > 0 ? `${points} XP` : 'Farm XP'}
                </p>
            </div>
        </div>
    );
};
