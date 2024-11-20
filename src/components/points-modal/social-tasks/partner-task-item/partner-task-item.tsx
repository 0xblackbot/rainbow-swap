import {isDefined} from '@rnw-community/shared';
import {FC} from 'react';

import {TaskTypeEnum} from '../../../../enums/task-type.enum';
import {TELEGRAM_CHANNEL_LINK} from '../../../../globals';
import {useWalletAddress} from '../../../../hooks/use-wallet-address.hook';
import {useDispatch} from '../../../../store';
import {checkTaskActions} from '../../../../store/wallet/wallet-actions';
import {useTaskSelector} from '../../../../store/wallet/wallet-selectors';
import {showInfoToast} from '../../../../utils/toast.utils';
import {TaskItem} from '../task-item/task-item';
import {TaskStatus} from '../task-status/task-status';

const LinksRecord: Record<TaskTypeEnum, string> = {
    [TaskTypeEnum.Telegram]: TELEGRAM_CHANNEL_LINK,
    [TaskTypeEnum.Twitter]: 'https://x.com/rainbow_swap',
    [TaskTypeEnum.TonApp]: 'https://ton.app/dex/rainbow-swap?id=2525',
    [TaskTypeEnum.TorchFinance_Telegram]: 'https://t.me/oxcurdle',
    [TaskTypeEnum.TorchFinance_Twitter]: 'https://x.com/TorchTon',
    [TaskTypeEnum.SnapX_Telegram]: 'https://t.me/SnapX_official',
    [TaskTypeEnum.SnapX_Twitter]: 'https://x.com/snapx_co',
    [TaskTypeEnum.AppsCenter_Telegram]: 'https://t.me/+eTPf2XXxBixhMTgy',
    [TaskTypeEnum.AppsCenter_Bot]: 'https://t.me/tapps/app?startapp=ref_1_5000',
    [TaskTypeEnum.JVault_Telegram]: 'https://t.me/JVault',
    [TaskTypeEnum.JVault_Staking]: 'https://jvault.xyz/staking',
    [TaskTypeEnum.TonHedge_Telegram]: 'https://t.me/ton_hedge',
    [TaskTypeEnum.TonHedge_Bot]:
        'https://t.me/ton_hedge_bot/trade?startapp=rainbowswap',
    [TaskTypeEnum.Parraton_Telegram]: 'https://t.me/parraton_en',
    [TaskTypeEnum.Parraton_Bot]:
        'https://t.me/parraton_bot/app?startapp=151872929',
    [TaskTypeEnum.GemsWall_Bot]:
        'https://t.me/GleamRewardsBot/app?startapp=cmM9ZjA5MjA3ZjQ0ZDgx',
    [TaskTypeEnum.GemsWall_Twitter]: 'https://x.com/gems_wall',
    [TaskTypeEnum.Ton2k_Telegram]: 'https://t.me/ton2keng',
    [TaskTypeEnum.Ton2k_TelegramRu]: 'https://t.me/ton2k'
};

const RewardsRecord: Record<TaskTypeEnum, string> = {
    [TaskTypeEnum.Telegram]: '2,000',
    [TaskTypeEnum.Twitter]: '2,000',
    [TaskTypeEnum.TonApp]: '10,000',
    [TaskTypeEnum.TorchFinance_Telegram]: '1,000',
    [TaskTypeEnum.TorchFinance_Twitter]: '1,000',
    [TaskTypeEnum.SnapX_Telegram]: '1,000',
    [TaskTypeEnum.SnapX_Twitter]: '1,000',
    [TaskTypeEnum.AppsCenter_Telegram]: '1,000',
    [TaskTypeEnum.AppsCenter_Bot]: '1,000',
    [TaskTypeEnum.JVault_Telegram]: '1,000',
    [TaskTypeEnum.JVault_Staking]: '1,000',
    [TaskTypeEnum.TonHedge_Telegram]: '1,000',
    [TaskTypeEnum.TonHedge_Bot]: '1,000',
    [TaskTypeEnum.Parraton_Telegram]: '1,000',
    [TaskTypeEnum.Parraton_Bot]: '1,000',
    [TaskTypeEnum.GemsWall_Bot]: '1,000',
    [TaskTypeEnum.GemsWall_Twitter]: '1,000',
    [TaskTypeEnum.Ton2k_Telegram]: '1,000',
    [TaskTypeEnum.Ton2k_TelegramRu]: '1,000'
};

interface Props {
    imageSrc: string;
    title: string;
    taskType: TaskTypeEnum;
    isTelegram?: boolean;
}

export const PartnerTaskItem: FC<Props> = ({
    imageSrc,
    title,
    taskType,
    isTelegram = false
}) => {
    const dispatch = useDispatch();
    const walletAddress = useWalletAddress();

    const reward = RewardsRecord[taskType];
    const task = useTaskSelector(taskType);

    const handleClick = () => {
        if (!isDefined(walletAddress)) {
            showInfoToast('Please, connect wallet');
        } else {
            const link = LinksRecord[taskType];

            isTelegram
                ? window.Telegram.WebApp.openTelegramLink(link)
                : window.Telegram.WebApp.openLink(link);
            if (task.data === 0) {
                dispatch(checkTaskActions.submit({taskType, walletAddress}));
            }
        }
    };

    return (
        <TaskItem
            imageSrc={imageSrc}
            title={title}
            description={`+${reward} XP`}
            onClick={handleClick}
        >
            <TaskStatus points={task.data} isLoading={task.isLoading} />
        </TaskItem>
    );
};
