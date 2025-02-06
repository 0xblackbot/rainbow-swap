import {EmptyFn, isDefined} from '@rnw-community/shared';
import {FC, useEffect} from 'react';

import styles from './competition-info.module.css';
import {useSwapForm} from '../../../contexts/swap-form/swap-form.hook';
import {TON} from '../../../globals';
import {useWalletAddress} from '../../../hooks/use-wallet-address.hook';
import {useDispatch} from '../../../store';
import {loadTradingCompetitionDataActions} from '../../../store/trading-competition/trading-competition-actions';
import {useTradingCompetitionDateSelector} from '../../../store/trading-competition/trading-competition-selectors';
import {Button} from '../../button/button';
import {Countdown} from '../../countdown/countdown';
import {Divider} from '../../points-modal/social-tasks/divider/divider';
import {Skeleton} from '../../skeleton/skeleton';

const COMPETITION_ID = 'kuku';

const getRewardText = (
    amount: number | undefined,
    symbol: string | undefined
) => {
    if (isDefined(amount) && isDefined(symbol)) {
        return `${amount.toLocaleString()} ${symbol}`;
    }

    return '-';
};

interface Props {
    onClose: EmptyFn;
}

export const CompetitionInfo: FC<Props> = ({onClose}) => {
    const dispatch = useDispatch();

    const walletAddress = useWalletAddress();
    const {setInputAssetAddress, setOutputAssetAddress, setInputAssetAmount} =
        useSwapForm();

    const data = useTradingCompetitionDateSelector();
    const isLoading = data.isLoading;

    useEffect(() => {
        dispatch(
            loadTradingCompetitionDataActions.submit({
                id: COMPETITION_ID,
                address: walletAddress
            })
        );
    }, [dispatch, walletAddress]);

    const handleTradeNowClick = () => {
        setInputAssetAddress(TON);
        setOutputAssetAddress(data.data.assetAddress);
        setInputAssetAmount('');
        onClose();
    };

    return (
        <div className={styles.container}>
            <img
                src={data.data.bgImageSrc}
                alt="Trading competition"
                className={styles.bg_image}
            />
            <div className={styles.title_container}>
                <Skeleton isLoading={isLoading}>
                    <p className={styles.title}>
                        {data.data.assetSymbol} Trading Competition
                    </p>
                </Skeleton>
            </div>

            <Skeleton isLoading={isLoading}>
                <p className={styles.description}>
                    Trade {data.data.assetSymbol} and compete for a prize pool.
                    <br />
                    Higher trading volume = larger reward!
                </p>
            </Skeleton>
            <Divider />
            <div className={styles.stats_container}>
                <div className={styles.row}>
                    <p>Prize pool</p>
                    <Skeleton isLoading={isLoading}>
                        <p className={styles.value}>
                            {getRewardText(
                                data.data.prizePool.amount,
                                data.data.prizePool.symbol
                            )}
                        </p>
                    </Skeleton>
                </div>
                <div className={styles.row}>
                    <p></p>
                    <Skeleton isLoading={isLoading}>
                        <p className={styles.usd_value}>
                            (${data.data.prizePool.usdValue.toLocaleString()})
                        </p>
                    </Skeleton>
                </div>
                <div className={styles.row}>
                    <p>Start date</p>
                    <Skeleton isLoading={isLoading}>
                        <Countdown
                            date={data.data.startDate}
                            isActive={Date.now() < data.data.startDate}
                        />
                    </Skeleton>
                </div>
                <div className={styles.row}>
                    <p>End date</p>
                    <Skeleton isLoading={isLoading}>
                        <Countdown
                            date={data.data.endDate}
                            isActive={data.data.startDate < Date.now()}
                            placeholder="Competition is over"
                        />
                    </Skeleton>
                </div>
                <div className={styles.row}>
                    <p>Distribution date</p>
                    <Skeleton isLoading={isLoading}>
                        <p>{data.data.distribution}</p>
                    </Skeleton>
                </div>
            </div>
            <div className={styles.stats_container}>
                <div className={styles.row}>
                    <p>Your rank</p>
                    <Skeleton isLoading={isLoading}>
                        <p className={styles.value}>
                            {data.data.addressInfo.rank ?? '-'}
                        </p>
                    </Skeleton>
                </div>
                <div className={styles.row}>
                    <p>Your trading volume</p>
                    <Skeleton isLoading={isLoading}>
                        <p className={styles.value}>
                            {data.data.addressInfo.volume
                                ? `$${data.data.addressInfo.volume.toFixed(2)}`
                                : '-'}
                        </p>
                    </Skeleton>
                </div>
                <div className={styles.row}>
                    <p>Your reward</p>
                    <Skeleton isLoading={isLoading}>
                        <p className={styles.value}>
                            {getRewardText(
                                data.data.addressInfo.rewardAmount,
                                data.data.addressInfo.rewardSymbol
                            )}
                        </p>
                    </Skeleton>
                </div>
            </div>
            <Button
                size="m"
                mode="bezeled"
                stretched={true}
                onClick={handleTradeNowClick}
            >
                <span>Trade now</span>
            </Button>
            <Divider />
            <div className={styles.title_container}>
                <p className={styles.title}>Leaderboard</p>
            </div>
            <div style={{overflowX: 'auto'}}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.align_left}>Rank</th>
                            <th className={styles.align_center}>
                                Wallet Address
                            </th>
                            <th className={styles.align_center}>Volume</th>
                            <th className={styles.align_right}>Reward</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.leaderboard.map((row, index) => (
                            <tr key={index}>
                                <td className={styles.align_center}>
                                    <Skeleton isLoading={isLoading}>
                                        <p>{row.rank}</p>
                                    </Skeleton>
                                </td>
                                <td className={styles.align_center}>
                                    <Skeleton isLoading={isLoading}>
                                        <p>{row.walletAddress}</p>
                                    </Skeleton>
                                </td>
                                <td className={styles.align_center}>
                                    <Skeleton isLoading={isLoading}>
                                        <p>${row.usdVolume.toFixed(2)}</p>
                                    </Skeleton>
                                </td>
                                <td className={styles.align_right}>
                                    <Skeleton isLoading={isLoading}>
                                        <p>
                                            {getRewardText(
                                                row.rewardAmount,
                                                row.rewardSymbol
                                            )}
                                        </p>
                                    </Skeleton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
