export type GetPointsAuthParams = {
    userId: number;
    refParent?: string;
};

export type PointsAuthResponse = {
    tapTap: number;
    referral: number;
    telegramChannel: number;
    xChannel: number;
};
