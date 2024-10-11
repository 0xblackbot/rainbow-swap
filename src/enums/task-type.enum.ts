export enum TaskTypeEnum {
    Telegram = 'telegramChannel',
    Twitter = 'xChannel',
    TonApp = 'tonApp',

    TorchFinance_Telegram = 'TorchFinance_Telegram',
    TorchFinance_Twitter = 'TorchFinance_Twitter',

    SnapX_Telegram = 'SnapX_Telegram',
    SnapX_Twitter = 'SnapX_Twitter',

    AppsCenter_Telegram = 'AppsCenter_Telegram',
    AppsCenter_Bot = 'AppsCenter_Bot',

    JVault_Telegram = 'JVault_Telegram',
    JVault_Staking = 'JVault_Staking',

    TonHedge_Telegram = 'TonHedge_Telegram',
    TonHedge_Bot = 'TonHedge_Bot',

    Parraton_Telegram = 'Parraton_Telegram',
    Parraton_Bot = 'Parraton_Bot'
}

export const PartnerTasksKeyRecord: Record<string, string> = {
    [TaskTypeEnum.TorchFinance_Telegram]: 'telegram',
    [TaskTypeEnum.TorchFinance_Twitter]: 'twitter',
    [TaskTypeEnum.SnapX_Telegram]: 'snapXTelegram',
    [TaskTypeEnum.SnapX_Twitter]: 'snapXTwitter',
    [TaskTypeEnum.AppsCenter_Telegram]: 'appsCenterTelegram',
    [TaskTypeEnum.AppsCenter_Bot]: 'appsCenterBot',
    [TaskTypeEnum.JVault_Telegram]: 'jvaultTelegram',
    [TaskTypeEnum.JVault_Staking]: 'jvaultStaking',
    [TaskTypeEnum.TonHedge_Telegram]: 'tonHedgeTelegram',
    [TaskTypeEnum.TonHedge_Bot]: 'tonHedgeBot',
    [TaskTypeEnum.Parraton_Telegram]: 'parratonTelegram',
    [TaskTypeEnum.Parraton_Bot]: 'parratonBot'
};
