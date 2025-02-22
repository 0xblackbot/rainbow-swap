import styles from './earn-fees.module.css';
import {useModals} from '../../../../contexts/modals/modals.hook';
import {LottieWithSuspense} from '../../../lottie/lottie-with-suspense';

export const EarnFees = () => {
    const modals = useModals();

    const handleClick = () => modals.openPointsModal();

    return (
        <div className={styles.container} onClick={handleClick}>
            <p className={styles.title}>Earn TON and farm points</p>
            <div className={styles.inner_container}>
                <div className={styles.list_container}>
                    <div className={styles.message_container}>
                        <p className={styles.message}>1</p>
                        <p className={styles.button}>
                            Copy link & invite frens
                        </p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.message}>2</p>
                        <p className={styles.button}>Complete tasks</p>
                    </div>
                    <div className={styles.message_container}>
                        <p className={styles.message}>3</p>
                        <p className={styles.button}>Claim rewards</p>
                    </div>
                </div>

                <div className={styles.animationContainer}>
                    <LottieWithSuspense
                        speed={0.9}
                        src="animations/duck-money.lottie"
                        className={styles.duck_airdrop}
                    />
                </div>
            </div>
        </div>
    );
};
