import styles from './invite-friends.module.css';
import {CopyIcon} from '../../../assets/icons/CopyIcon/CopyIcon';
import {trackButtonClick} from '../../../hooks/use-analytics.hook';
import {useOpenTonConnectModal} from '../../../hooks/use-open-ton-connect-modal.hook';
import {useReferralLink} from '../../../hooks/use-referral-link.hook';
import {useWalletAddress} from '../../../hooks/use-wallet-address.hook';
import {useNumberOfReferralsSelector} from '../../../store/points/points-selectors';
import {copyToClipboard} from '../../../utils/clipboard.utils';
import {showSuccessToast} from '../../../utils/toast.utils';
import {Button} from '../../button/button';
import {Lottie} from '../../lottie/lottie';

export const InviteFriends = () => {
    const walletAddress = useWalletAddress();
    const openTonConnectModal = useOpenTonConnectModal();

    const referralLink = useReferralLink();
    const numberOfReferrals = useNumberOfReferralsSelector();

    const handleCopyClick = async () => {
        await copyToClipboard(referralLink);
        showSuccessToast('Your referral link copied!');
    };

    const handleConnect = () => {
        trackButtonClick('Points modal Connect');
        openTonConnectModal();
    };

    return (
        <div className={styles.container}>
            <Lottie
                src="/animations/diamond.lottie"
                className={styles.animation_container}
            />
            <p className={styles.title}>Invite frens</p>
            <p className={styles.description}>
                Refer new users and earn 10% of their <br /> trading fees and
                +5,000 XP
            </p>
            {walletAddress ? (
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
            ) : (
                <Button
                    size="m"
                    mode="gray"
                    stretched={true}
                    onClick={handleConnect}
                >
                    <span>Connect wallet</span>
                </Button>
            )}
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
