export type GetTradingCompetitionDataParams = {
    id: string;
    address?: string;
};

export type TradingCompetitionDataResponse = {
    bgImageSrc: string;
    assetSymbol: string;
    assetAddress: string;
    startDate: number;
    endDate: number;
    distribution: string;
    prizePool: {
        amount: number;
        symbol: string;
        usdValue: number;
    };
    addressInfo: {
        rank: number | undefined;
        volume: number | undefined;
        rewardAmount: number | undefined;
        rewardSymbol: string | undefined;
    };
    leaderboard: {
        rank: number;
        walletAddress: string;
        usdVolume: number;
        rewardAmount: number;
        rewardSymbol: string;
    }[];
};

export const EMPTY_TRADING_COMPETITION_DATA: TradingCompetitionDataResponse = {
    bgImageSrc:
        'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/trading-competitions/empty.png',
    assetSymbol: '???',
    assetAddress: 'unknown_token',
    startDate: 0,
    endDate: 0,
    distribution: '-',
    prizePool: {
        amount: 0,
        symbol: '???',
        usdValue: 0
    },
    addressInfo: {
        rank: undefined,
        volume: undefined,
        rewardAmount: undefined,
        rewardSymbol: undefined
    },
    leaderboard: new Array(10).fill(0).map((_, index) => ({
        rank: index + 1,
        walletAddress: '-',
        usdVolume: 0,
        rewardAmount: 0,
        rewardSymbol: '???'
    }))
};
