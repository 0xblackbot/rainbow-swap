import {lazy, Suspense} from 'react';

import styles from './earn-fees.module.css';
import {useModals} from '../../../../contexts/modals/modals.hook';
import {Skeleton} from '../../../skeleton/skeleton';

const DuckMoney = lazy(
    () =>
        import('../../../referrals-modal/referrer-stats/duck-money/duck-money')
);

export const EarnFees = () => {
    const modals = useModals();

    const handleContainerClick = () => modals.openReferralsModal();

    return (
        <div className={styles.container} onClick={handleContainerClick}>
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

                <Suspense
                    fallback={
                        <Skeleton
                            isLoading={true}
                            className={styles.duck_airdrop}
                        />
                    }
                >
                    <DuckMoney className={styles.duck_airdrop} />
                </Suspense>
            </div>
        </div>
    );
};
