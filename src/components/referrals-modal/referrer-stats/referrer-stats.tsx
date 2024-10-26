import styles from './referrer-stats.module.css';
import {CopyIcon} from '../../../assets/icons/CopyIcon/CopyIcon';
import {WEB_LINK} from '../../../globals';
import {trackButtonClick} from '../../../hooks/use-analytics.hook';
import {useOpenTonConnectModal} from '../../../hooks/use-open-ton-connect-modal.hook';
import {useWalletAddress} from '../../../hooks/use-wallet-address.hook';
import {copyToClipboard} from '../../../utils/clipboard.utils';
import {showSuccessToast} from '../../../utils/toast.utils';
import {Button} from '../../button/button';
import {Divider} from '../../points-modal/social-tasks/divider/divider';

const CONTACT_LINK = 'https://t.me/yuraivanchyshyn';
const SDK_LINK = 'https://www.npmjs.com/package/rainbow-swap-sdk';

export const ReferrerStats = () => {
    const walletAddress = useWalletAddress();
    const openTonConnectModal = useOpenTonConnectModal();

    const data = walletAddress
        ? {
              tradersReferred: '0',
              refereesVolume: '$0.00',
              unclaimedRewards: '$0.00',
              totalRewardsEarned: '$0.00'
          }
        : {
              tradersReferred: '-',
              refereesVolume: '-',
              unclaimedRewards: '-',
              totalRewardsEarned: '-'
          };

    const handleCopyClick = async () => {
        const REF_URL = `${WEB_LINK}?r=${walletAddress}`;

        await copyToClipboard(REF_URL);
        showSuccessToast('Your referral link copied!');
    };

    const handleConnect = () => {
        trackButtonClick('Referral Connect');
        openTonConnectModal();
    };

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <p className={styles.title}>Standard Referral</p>
                {walletAddress ? (
                    <Button size="xs" mode="bezeled" onClick={handleCopyClick}>
                        <span>Copy link</span>
                    </Button>
                ) : (
                    <Button size="xs" mode="bezeled" onClick={handleConnect}>
                        <span>Connect wallet</span>
                    </Button>
                )}
            </div>
            <p className={styles.description}>
                Refer new users and earn 10% of their trading fees.
            </p>
            <Divider />
            <div className={styles.title_container}>
                <p className={styles.title}>Influencer Bonus</p>
                <Button
                    size="xs"
                    mode="bezeled"
                    Component="a"
                    href={CONTACT_LINK}
                    target="_blank"
                >
                    <span>Contact us</span>
                </Button>
            </div>
            <p className={styles.description}>
                If you're an influencer, contact us to access exclusive bonuses.
            </p>
            <Divider />
            <div className={styles.title_container}>
                <p className={styles.title}>App Developer Partnership</p>
                <Button
                    size="xs"
                    mode="bezeled"
                    Component="a"
                    href={SDK_LINK}
                    target="_blank"
                >
                    <span>Open SDK</span>
                </Button>
            </div>
            <p className={styles.description}>
                Integrate our SDK, enable in-app swaps, set custom fees, and
                enjoy a 50% revenue share.
            </p>

            <Divider />

            <div className={styles.stats_container}>
                <div className={styles.row}>
                    <p>Traders Referred</p>
                    <p>{data.tradersReferred}</p>
                </div>
                <div className={styles.row}>
                    <p>Referees Volume</p>
                    <p>{data.refereesVolume}</p>
                </div>
                <div className={styles.row}>
                    <p>Total Rewards Earned</p>
                    <p>{data.totalRewardsEarned}</p>
                </div>
                <div className={styles.row}>
                    <p>Unclaimed Rewards</p>
                    <p>{data.unclaimedRewards}</p>
                </div>
            </div>

            {walletAddress ? (
                <>
                    <Button
                        size="m"
                        mode="gray"
                        stretched={true}
                        className={styles.copy_button}
                        onClick={handleCopyClick}
                    >
                        <CopyIcon className={styles.copy_icon} />
                        <span>Copy referral link</span>
                    </Button>
                    <Button
                        size="m"
                        mode="bezeled"
                        stretched={true}
                        onClick={() => void 0}
                    >
                        <span>Claim rewards</span>
                    </Button>
                </>
            ) : (
                <Button
                    size="m"
                    mode="bezeled"
                    stretched={true}
                    onClick={handleConnect}
                >
                    <span>Connect wallet</span>
                </Button>
            )}
        </div>
    );
};
