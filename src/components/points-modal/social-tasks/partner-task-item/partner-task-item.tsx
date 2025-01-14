import {EmptyFn, emptyFn, isDefined} from '@rnw-community/shared';
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

const OPEN_SWAP = 'open_swap';

const LinksRecord: Record<TaskTypeEnum, string> = {
    [TaskTypeEnum.Telegram]: TELEGRAM_CHANNEL_LINK,
    [TaskTypeEnum.Twitter]: 'https://x.com/rainbow_swap',
    [TaskTypeEnum.TonApp]: 'https://ton.app/dex/rainbow-swap?id=2525',
    [TaskTypeEnum.Intract_500]: OPEN_SWAP,
    [TaskTypeEnum.TorchFinance_Telegram]:
        'https://t.me/torch_finance_bot/torlympics?startapp=P3JlZj0xNTE4NzI5Mjk=',
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
    [TaskTypeEnum.Ton2k_TelegramRu]: 'https://t.me/ton2k',
    [TaskTypeEnum.TonStation_Bot]:
        'https://t.me/tonstationgames_bot/app?startapp=ref_8ecvbawnh2wyxnnq27gyl7',
    [TaskTypeEnum.Clayton_Bot]:
        'https://t.me/claytoncoinbot/game?startapp=02bbc3',
    [TaskTypeEnum.notPixel_Bot]:
        'https://t.me/notpixel/app?startapp=f151872929_s574604',
    [TaskTypeEnum.Terminal_Bot]:
        'https://t.me/terminalgame_bot/terminalgame?startapp=V8XW4H36&startApp=V8XW4H36',
    [TaskTypeEnum.BlockLabs_Bot]:
        'https://t.me/blocklab_bot?start=MTczMjg5MDg0MTI5MQ',
    [TaskTypeEnum.DaoLama_Swap]:
        'https://app.daolama.co/LLAMA?ref=iBDfh1gmek&utm_source=telegram&utm_medium=messenger&utm_campaign=RAINBOW',
    [TaskTypeEnum.DaoLama_Borrow]:
        'https://app.daolama.co/borrow?ref=iBDfh1gmek&utm_source=telegram&utm_medium=messenger&utm_campaign=RAINBOW'
};

const RewardsRecord: Record<TaskTypeEnum, string> = {
    [TaskTypeEnum.Telegram]: '2,000',
    [TaskTypeEnum.Twitter]: '2,000',
    [TaskTypeEnum.TonApp]: '10,000',
    [TaskTypeEnum.Intract_500]: '25,000',
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
    [TaskTypeEnum.Ton2k_TelegramRu]: '1,000',
    [TaskTypeEnum.TonStation_Bot]: '1,000',
    [TaskTypeEnum.Clayton_Bot]: '1,000',
    [TaskTypeEnum.notPixel_Bot]: '1,000',
    [TaskTypeEnum.Terminal_Bot]: '1,000',
    [TaskTypeEnum.BlockLabs_Bot]: '1,000',
    [TaskTypeEnum.DaoLama_Swap]: '1,000',
    [TaskTypeEnum.DaoLama_Borrow]: '1,000'
};

interface Props {
    imageSrc: string;
    title: string;
    taskType: TaskTypeEnum;
    isTelegram?: boolean;
    onSwap?: EmptyFn;
}

export const PartnerTaskItem: FC<Props> = ({
    imageSrc,
    title,
    taskType,
    isTelegram = false,
    onSwap = emptyFn
}) => {
    const dispatch = useDispatch();
    const walletAddress = useWalletAddress();

    const reward = RewardsRecord[taskType];
    const task = useTaskSelector(taskType);

    const handleClick = () => {
        const link = LinksRecord[taskType];

        if (link === OPEN_SWAP) {
            return onSwap();
        }

        if (!isDefined(walletAddress)) {
            showInfoToast('Please, connect wallet');
        } else {
            if (isTelegram) {
                window.Telegram.WebApp.openTelegramLink(link);
            } else {
                window.Telegram.WebApp.openLink(link);
            }
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
