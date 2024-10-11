import styles from './invite-friends.module.css';
import {TELEGRAM_APP_LINK} from '../../../../globals';
import {
    useNumberOfReferralsSelector,
    useRefHashSelector
} from '../../../../store/points/points-selectors';
import {copyToClipboard} from '../../../../utils/clipboard.utils';
import {showSuccessToast} from '../../../../utils/toast.utils';

export const InviteFriends = () => {
    const numberOfReferrals = useNumberOfReferralsSelector();
    const refHash = useRefHashSelector();
    const REF_URL = `${TELEGRAM_APP_LINK}?startapp=${refHash}`;

    const handleCopyClick = async () => {
        await copyToClipboard(REF_URL);
        showSuccessToast('Link copied!');
    };

    const handleInviteClick = (
        event: React.MouseEvent<HTMLParagraphElement, MouseEvent>
    ) => {
        event.stopPropagation();

        const url = `https://t.me/share/url?url=${REF_URL}`;
        window.Telegram.WebApp.openTelegramLink(url);
    };

    return (
        <div className={styles.container}>
            <div className={styles.friends_container}>
                <p className={styles.bonus_text}>+5,000</p>
                <p>for 1 fren</p>
            </div>
            <p className={styles.title}>Invite frens</p>
            <p className={styles.counter_text}>
                <span>Invite frens to get bonuses!</span>
                <br />
                <span>Friends invited:</span>
                <span className={styles.counter_value}>
                    {' '}
                    {numberOfReferrals}
                </span>
            </p>
            <p className={styles.copy_button} onClick={handleCopyClick}>
                Copy referral link
            </p>
            <p className={styles.share_button} onClick={handleInviteClick}>
                Share
            </p>
        </div>
    );
};
