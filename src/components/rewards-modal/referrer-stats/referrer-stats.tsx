import {isDefined} from '@rnw-community/shared';
import {useMemo} from 'react';

import styles from './referrer-stats.module.css';
import {CopyIcon} from '../../../assets/icons/CopyIcon/CopyIcon';
import {INIT_DATA, TON_DECIMALS} from '../../../globals';
import {trackButtonClick} from '../../../hooks/use-analytics.hook';
import {useOpenTonConnectModal} from '../../../hooks/use-open-ton-connect-modal.hook';
import {useReferralLink} from '../../../hooks/use-referral-link.hook';
import {useWalletAddress} from '../../../hooks/use-wallet-address.hook';
import {useDispatch} from '../../../store';
import {claimRewardsActions} from '../../../store/wallet/wallet-actions';
import {useRewardsStateSelector} from '../../../store/wallet/wallet-selectors';
import {fromNano, toNano} from '../../../utils/big-int.utils';
import {copyToClipboard} from '../../../utils/clipboard.utils';
import {showInfoToast, showSuccessToast} from '../../../utils/toast.utils';
import {Button} from '../../button/button';
import {Divider} from '../../points-modal/social-tasks/divider/divider';
import {Skeleton} from '../../skeleton/skeleton';

const CONTACT_LINK = 'https://t.me/rainbow_swap_manager';
const SDK_LINK = 'https://www.npmjs.com/package/rainbow-swap-sdk';

const MIN_CLAIM_AMOUNT = '0.1';
const MIN_CLAIM_NANO_AMOUNT = toNano(MIN_CLAIM_AMOUNT, TON_DECIMALS);

export const ReferrerStats = () => {
    const dispatch = useDispatch();
    const referralLink = useReferralLink();
    const walletAddress = useWalletAddress();
    const openTonConnectModal = useOpenTonConnectModal();

    const rewardsState = useRewardsStateSelector();

    const data = useMemo(() => {
        if (!isDefined(walletAddress)) {
            return {
                tradersReferred: '-',
                refereesVolume: '-',
                unclaimedRewards: '-',
                totalRewardsEarned: '-'
            };
        }

        const bigIntUnclaimedRewards = BigInt(
            rewardsState.data.unclaimedRewards
        );
        const bigIntTotalRewardsEarned = BigInt(
            rewardsState.data.totalRewardsEarned
        );

        const tonUnclaimedRewards = fromNano(
            bigIntUnclaimedRewards,
            TON_DECIMALS
        );
        const tonTotalRewardsEarned = fromNano(
            bigIntTotalRewardsEarned,
            TON_DECIMALS
        );

        const unclaimedRewardsFractionDigits =
            bigIntUnclaimedRewards < MIN_CLAIM_NANO_AMOUNT ? 5 : 2;
        const totalRewardsEarnedFractionDigits =
            bigIntTotalRewardsEarned < MIN_CLAIM_NANO_AMOUNT ? 5 : 2;

        return {
            tradersReferred:
                rewardsState.data.usersReferred +
                rewardsState.data.walletsReferred,
            refereesVolume: `$${rewardsState.data.refereesVolume.toFixed(2)}`,
            unclaimedRewards: `${parseFloat(tonUnclaimedRewards).toFixed(unclaimedRewardsFractionDigits)} TON`,
            totalRewardsEarned: `${parseFloat(tonTotalRewardsEarned).toFixed(totalRewardsEarnedFractionDigits)} TON`
        };
    }, [walletAddress, rewardsState.data]);

    const handleCopyClick = async () => {
        await copyToClipboard(referralLink);
        showSuccessToast('Your referral link copied!');
    };

    const handleConnect = () => {
        trackButtonClick('Referral Connect');
        openTonConnectModal();
    };

    const handleClaimClick = () => {
        if (walletAddress) {
            if (
                BigInt(rewardsState.data.unclaimedRewards) >=
                MIN_CLAIM_NANO_AMOUNT
            ) {
                dispatch(
                    claimRewardsActions.submit({
                        address: walletAddress,
                        initData: INIT_DATA
                    })
                );
                showSuccessToast('Claim request sent!');
            } else {
                showInfoToast('Minimum 0.1 TON required to claim rewards.');
            }
        }
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
                    <Skeleton
                        isLoading={rewardsState.isLoading}
                        className={styles.skeleton}
                    >
                        <p>{data.tradersReferred}</p>
                    </Skeleton>
                </div>
                <div className={styles.row}>
                    <p>Referees Volume</p>
                    <Skeleton
                        isLoading={rewardsState.isLoading}
                        className={styles.skeleton}
                    >
                        <p>{data.refereesVolume}</p>
                    </Skeleton>
                </div>
                <div className={styles.row}>
                    <p>Total Rewards Earned</p>
                    <Skeleton
                        isLoading={rewardsState.isLoading}
                        className={styles.skeleton}
                    >
                        <p>{data.totalRewardsEarned}</p>
                    </Skeleton>
                </div>
                <div className={styles.row}>
                    <p>Unclaimed Rewards</p>
                    <Skeleton
                        isLoading={rewardsState.isLoading}
                        className={styles.skeleton}
                    >
                        <p>{data.unclaimedRewards}</p>
                    </Skeleton>
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
                        onClick={handleClaimClick}
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
