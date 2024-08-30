export type GetPointsAuthParams = {
    initData: string;
    refParent?: string;
};

export type PointsAuthResponse = {
    tapTap: number;
    referral: number;
    telegramChannel: number;
    xChannel: number;
    // All partner tasks are located here
    torchFinance?: Record<string, number>;
};
