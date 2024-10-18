import {Suspense, lazy} from 'react';

import styles from './referrer-stats.module.css';
import {CopyIcon} from '../../../assets/icons/CopyIcon/CopyIcon';
import {WEB_LINK} from '../../../globals';
import {trackButtonClick} from '../../../hooks/use-analytics.hook';
import {useOpenTonConnectModal} from '../../../hooks/use-open-ton-connect-modal.hook';
import {useWalletAddress} from '../../../hooks/use-wallet-address.hook';
import {copyToClipboard} from '../../../utils/clipboard.utils';
import {showSuccessToast} from '../../../utils/toast.utils';
import {Skeleton} from '../../skeleton/skeleton';

const DuckMoney = lazy(() => import('./duck-money/duck-money'));

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
        showSuccessToast('Link copied!');
    };

    const handleConnect = () => {
        trackButtonClick('Referral Connect');
        openTonConnectModal();
    };

    return (
        <div className={styles.container}>
            <div className={styles.description_container}>
                <Suspense
                    fallback={
                        <Skeleton
                            isLoading={true}
                            className={styles.duck_money_fallback}
                        />
                    }
                >
                    <DuckMoney className={styles.duck_money} />
                </Suspense>

                <p className={styles.description}>
                    Refer new users and earn 10% <br />
                    of their trading fees.
                </p>
            </div>

            <div className={styles.row}>
                <p>Traders Referred</p>
                <p>{data.tradersReferred}</p>
            </div>
            <div className={styles.row}>
                <p>Referees Volume</p>
                <p>{data.refereesVolume}</p>
            </div>
            <div className={styles.row}>
                <p>Unclaimed Rewards</p>
                <p>{data.unclaimedRewards}</p>
            </div>
            <div className={styles.row}>
                <p>Total Rewards Earned</p>
                <p>{data.totalRewardsEarned}</p>
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
