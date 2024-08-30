export enum TaskTypeEnum {
    Telegram = 'telegramChannel',
    Twitter = 'xChannel',

    TorchFinance_Telegram = 'TorchFinance_Telegram',
    TorchFinance_Twitter = 'TorchFinance_Twitter',

    SnapX_Telegram = 'SnapX_Telegram',
    SnapX_Twitter = 'SnapX_Twitter'
}

export const PARTNER_TASKS_ARRAY = [
    TaskTypeEnum.TorchFinance_Telegram,
    TaskTypeEnum.TorchFinance_Twitter,
    TaskTypeEnum.SnapX_Telegram,
    TaskTypeEnum.SnapX_Twitter
];

export const PartnerTasksKeyRecord: Record<string, string> = {
    [TaskTypeEnum.TorchFinance_Telegram]: 'telegram',
    [TaskTypeEnum.TorchFinance_Twitter]: 'twitter',
    [TaskTypeEnum.SnapX_Telegram]: 'snapXTelegram',
    [TaskTypeEnum.SnapX_Twitter]: 'snapXTwitter'
};
