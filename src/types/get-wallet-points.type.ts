export type GetWalletPointsParams = {
    address: string;
    initData: string;
    refParent?: string;
};

export type WalletPointsResponse = {
    refHash: string;
    bonusPoints: number;
    tapTapPoints: number;
    referralPoints: number;
    swapVolumePoints: number;
    referralState: {
        usersReferred: number;
        walletsReferred: number;
        refereesVolume: number;
        totalRewardsEarned: number;
        unclaimedRewards: number;
    };
    tasksState: Record<string, number>;
};

export const emptyWalletPoints: WalletPointsResponse = {
    refHash: '',
    bonusPoints: 0,
    tapTapPoints: 0,
    referralPoints: 0,
    swapVolumePoints: 0,
    referralState: {
        usersReferred: 0,
        walletsReferred: 0,
        refereesVolume: 0,
        totalRewardsEarned: 0,
        unclaimedRewards: 0
    },
    tasksState: {}
};
