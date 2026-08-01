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

type PartnerTaskType = Exclude<TaskTypeEnum, TaskTypeEnum.AdsGram>;

const LinksRecord: Record<PartnerTaskType, string> = {
    [TaskTypeEnum.Telegram]: TELEGRAM_CHANNEL_LINK,
    [TaskTypeEnum.Twitter]: 'https://x.com/rainbow_swap',
    [TaskTypeEnum.TonApp]: 'https://ton.app/dex/rainbow-swap?id=2525'
};

const RewardsRecord: Record<PartnerTaskType, string> = {
    [TaskTypeEnum.Telegram]: '2,000',
    [TaskTypeEnum.Twitter]: '2,000',
    [TaskTypeEnum.TonApp]: '10,000'
};

interface Props {
    imageSrc: string;
    title: string;
    taskType: PartnerTaskType;
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
        const link = LinksRecord[taskType];

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
