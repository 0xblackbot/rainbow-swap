export interface WalletPointsState {
    refHash: string;
    refParent: string | undefined;
    bonusPoints: number;
    tapTapPoints: number;
    referralPoints: number;
    swapVolumePoints: number;
    rewardsState: {
        usersReferred: number;
        walletsReferred: number;
        refereesVolume: number;
        totalRewardsEarned: string;
        unclaimedRewards: string;
    };
    tasksState: Record<string, number>;
}

export const emptyWalletPoints: WalletPointsState = {
    refHash: '',
    refParent: undefined,
    bonusPoints: 0,
    tapTapPoints: 0,
    referralPoints: 0,
    swapVolumePoints: 0,
    rewardsState: {
        usersReferred: 0,
        walletsReferred: 0,
        refereesVolume: 0,
        totalRewardsEarned: '0',
        unclaimedRewards: '0'
    },
    tasksState: {}
};
