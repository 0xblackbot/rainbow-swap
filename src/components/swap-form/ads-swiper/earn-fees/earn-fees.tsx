import styles from './earn-fees.module.css';
import {useModals} from '../../../../contexts/modals/modals.hook';
import {LottieWithSuspense} from '../../../lottie/lottie-with-suspense';

export const EarnFees = () => {
    const modals = useModals();

    const handleClick = () => modals.openRewardsModal();

    return (
        <div className={styles.container} onClick={handleClick}>
            <p className={styles.title}>Earn TON with referral program!</p>
            <div className={styles.inner_container}>
                <div className={styles.list_container}>
                    <div className={styles.message_container}>
                        <p className={styles.message}>1</p>
                        <p className={styles.button}>Get your link</p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.message}>2</p>
                        <p className={styles.button}>Invite frens</p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.message}>3</p>
                        <p className={styles.button}>Claim rewards</p>
                    </div>
                </div>

                <LottieWithSuspense
                    src="/animations/duck-money.lottie"
                    className={styles.duck_airdrop}
                />
            </div>
        </div>
    );
};
