import styles from './invite-friends.module.css';
import {CopyIcon} from '../../../../assets/icons/CopyIcon/CopyIcon';
import {useReferralLink} from '../../../../hooks/use-referral-link.hook';
import {useNumberOfReferralsSelector} from '../../../../store/points/points-selectors';
import {copyToClipboard} from '../../../../utils/clipboard.utils';
import {showSuccessToast} from '../../../../utils/toast.utils';
import {Button} from '../../../button/button';
import sharedStyles from '../../../swap-form/settings-button/settings-button.module.css';

export const InviteFriends = () => {
    const referralLink = useReferralLink();
    const numberOfReferrals = useNumberOfReferralsSelector();

    const handleCopyClick = async () => {
        await copyToClipboard(referralLink);
        showSuccessToast('Your referral link copied!');
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>Invite frens</p>
            <p className={sharedStyles.description}>
                Refer new users and earn 10% of their <br /> trading fees and
                +5,000 points
            </p>
            <Button
                size="m"
                mode="filled"
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
