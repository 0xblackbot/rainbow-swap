import {TaskTypeEnum} from '../../enums/task-type.enum';
import {useWalletAddress} from '../../hooks/use-wallet-address.hook';
import {useSelector} from '../index';
import {createEntity} from '../utils/create-entity';

export const useRainbowWalletSelector = () => {
    const ownerAddress = useWalletAddress();

    return useSelector(({wallet}) =>
        ownerAddress && wallet.rainbowWallet.ownerAddress === ownerAddress
            ? wallet.rainbowWallet.data
            : null
    );
};

export const useBalancesRecordSelector = () =>
    useSelector(
        ({wallet}) => wallet.balances.data,
        (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );

export const useUserAssetsSelector = () =>
    useSelector(
        ({wallet}) => Object.keys(wallet.balances.data),
        (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );

export const useAssetBalanceSelector = (address: string) =>
    useSelector(({wallet}) => wallet.balances.data[address] ?? '0');

export const usePendingSwapSelector = () =>
    useSelector(({wallet}) => wallet.swapsState.pending);

export const useSwapHistoryDataSelector = () =>
    useSelector(({wallet}) => wallet.swapsState.history);

export const usePointsSelector = () =>
    useSelector(({wallet}) => {
        const walletPoints =
            wallet.pointsState.walletPoints.data.bonusPoints +
            wallet.pointsState.walletPoints.data.tapTapPoints +
            wallet.pointsState.walletPoints.data.referralPoints +
            wallet.pointsState.walletPoints.data.swapVolumePoints;

        let tasksPoints = 0;

        for (const value of Object.values(wallet.pointsState.tasks)) {
            tasksPoints += value.data;
        }

        return walletPoints + tasksPoints;
    });

export const useNumberOfReferralsSelector = () =>
    useSelector(
        ({wallet}) =>
            wallet.pointsState.walletPoints.data.rewardsState.usersReferred +
            wallet.pointsState.walletPoints.data.rewardsState.walletsReferred
    );

const EMPTY_TASK_STATE = createEntity(0);

export const useTaskSelector = (taskType: TaskTypeEnum) =>
    useSelector(
        ({wallet}) => wallet.pointsState.tasks[taskType] ?? EMPTY_TASK_STATE
    );

export const useAdsGramRewardAvailableAtSelector = () =>
    useSelector(
        ({wallet}) =>
            wallet.pointsState.walletPoints.data.adsGramRewardAvailableAt
    );

export const useRewardsStateSelector = () =>
    useSelector(({wallet}) => ({
        isLoading: wallet.pointsState.walletPoints.isLoading,
        data: wallet.pointsState.walletPoints.data.rewardsState
    }));

export const useRainbowWithdrawalSelector = () => {
    const owner = useWalletAddress();
    return useSelector(({wallet}) =>
        owner ? wallet.rainbowWithdrawals?.[owner] : undefined
    );
};

export const useRainbowWithdrawalCooldownSelector = () => {
    const owner = useWalletAddress();
    return useSelector(({wallet}) =>
        owner ? (wallet.rainbowWithdrawalCooldowns?.[owner] ?? 0) : 0
    );
};
