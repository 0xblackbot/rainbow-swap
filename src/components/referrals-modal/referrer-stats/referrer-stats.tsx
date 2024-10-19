import styles from './referrer-stats.module.css';
import {CopyIcon} from '../../../assets/icons/CopyIcon/CopyIcon';
import {WEB_LINK} from '../../../globals';
import {trackButtonClick} from '../../../hooks/use-analytics.hook';
import {useOpenTonConnectModal} from '../../../hooks/use-open-ton-connect-modal.hook';
import {useWalletAddress} from '../../../hooks/use-wallet-address.hook';
import {copyToClipboard} from '../../../utils/clipboard.utils';
import {showSuccessToast} from '../../../utils/toast.utils';
import {Divider} from '../../points-modal/tasks/divider/divider';
import sharedStyles from '../../swap-form/settings-button/settings-button.module.css';

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
                    <div className={styles.button} onClick={handleCopyClick}>
                        Copy link
                    </div>
                ) : (
                    <div className={styles.button} onClick={handleConnect}>
                        Connect wallet
                    </div>
                )}
            </div>
            <p className={sharedStyles.description}>
                Refer new users and earn 10% of their trading fees.
            </p>
            <Divider />
            <div className={styles.title_container}>
                <p className={sharedStyles.title}>Influencer Bonus</p>
                <a
                    className={styles.button}
                    href={CONTACT_LINK}
                    target="_blank"
                >
                    Contact us
                </a>
            </div>
            <p className={sharedStyles.description}>
                If you're an influencer, contact us to access exclusive bonuses.
            </p>
            <Divider />
            <div className={styles.title_container}>
                <p className={sharedStyles.title}>App Developer Partnership</p>
                <a className={styles.button} href={SDK_LINK} target="_blank">
                    Open SDK
                </a>
            </div>
            <p className={sharedStyles.description}>
                Integrate our SDK, enable in-app swaps, set custom fees, and
                enjoy a 50/50 revenue share.
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
                    <div
                        className={styles.copy_button}
                        onClick={handleCopyClick}
                    >
                        <CopyIcon />
                        Copy referral link
                    </div>
                    <div className={styles.claim_button} onClick={() => void 0}>
                        Claim rewards
                    </div>
                </>
            ) : (
                <div className={styles.claim_button} onClick={handleConnect}>
                    Connect wallet
                </div>
            )}
        </div>
    );
};
