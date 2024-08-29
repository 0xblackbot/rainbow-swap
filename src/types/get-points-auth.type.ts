export type GetPointsAuthParams = {
    initData: string;
    refParent?: string;
};

export type PointsAuthResponse = {
    tapTap: number;
    referral: number;
    telegramChannel: number;
    xChannel: number;
    torchFinance: {
        telegram: number;
        twitter: number;
    };
};
