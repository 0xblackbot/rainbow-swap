import {Suspense, lazy} from 'react';

import styles from './invite-friends.module.css';
import {CopyIcon} from '../../../assets/icons/CopyIcon/CopyIcon';
import {useReferralLink} from '../../../hooks/use-referral-link.hook';
import {useNumberOfReferralsSelector} from '../../../store/points/points-selectors';
import {copyToClipboard} from '../../../utils/clipboard.utils';
import {showSuccessToast} from '../../../utils/toast.utils';
import {Button} from '../../button/button';
import {Skeleton} from '../../skeleton/skeleton';

const Diamond = lazy(() => import('./diamond/diamond'));

export const InviteFriends = () => {
    const referralLink = useReferralLink();
    const numberOfReferrals = useNumberOfReferralsSelector();

    const handleCopyClick = async () => {
        await copyToClipboard(referralLink);
        showSuccessToast('Your referral link copied!');
    };

    return (
        <div className={styles.container}>
            <Suspense
                fallback={
                    <Skeleton
                        isLoading={true}
                        className={styles.animation_container}
                    />
                }
            >
                <Diamond className={styles.animation_container} />
            </Suspense>
            <p className={styles.title}>Invite frens</p>
            <p className={styles.description}>
                Refer new users and earn 10% of their <br /> trading fees and
                +5,000 XP
            </p>
            <Button
                size="m"
                mode="gray"
                stretched={true}
                className={styles.copy_button}
                onClick={handleCopyClick}
            >
                <CopyIcon className={styles.copy_icon} />
                <span>Copy link</span>
            </Button>
            <p className={styles.counter_text}>
                <span>Friends invited:</span>
                <span className={styles.counter_value}>
                    {' '}
                    {numberOfReferrals}
                </span>
            </p>
        </div>
    );
};
