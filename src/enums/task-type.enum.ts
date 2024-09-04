export enum TaskTypeEnum {
    Telegram = 'telegramChannel',
    Twitter = 'xChannel',

    TorchFinance_Telegram = 'TorchFinance_Telegram',
    TorchFinance_Twitter = 'TorchFinance_Twitter',

    SnapX_Telegram = 'SnapX_Telegram',
    SnapX_Twitter = 'SnapX_Twitter',

    AppsCenter_Telegram = 'AppsCenter_Telegram',
    AppsCenter_Bot = 'AppsCenter_Bot'
}

export const PartnerTasksKeyRecord: Record<string, string> = {
    [TaskTypeEnum.TorchFinance_Telegram]: 'telegram',
    [TaskTypeEnum.TorchFinance_Twitter]: 'twitter',
    [TaskTypeEnum.SnapX_Telegram]: 'snapXTelegram',
    [TaskTypeEnum.SnapX_Twitter]: 'snapXTwitter',
    [TaskTypeEnum.AppsCenter_Telegram]: 'appsCenterTelegram',
    [TaskTypeEnum.AppsCenter_Bot]: 'appsCenterBot'
};
