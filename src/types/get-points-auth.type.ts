export type GetPointsAuthParams = {
    initData: string;
    refParent?: string;
};

export type PointsAuthResponse = {
    refHash: string;
    tapTap: number;
    swapsVolume: number;
    referral: number;
    telegramChannel: number;
    xChannel: number;
    tonApp: number;
    // All partner tasks are located here
    torchFinance?: Record<string, number>;
};
