import {isDefined} from '@rnw-community/shared';
import {FC} from 'react';

import {TaskTypeEnum} from '../../../../enums/task-type.enum';
import {useWalletAddress} from '../../../../hooks/use-wallet-address.hook';
import {useDispatch} from '../../../../store';
import {checkPartnerTaskActions} from '../../../../store/points/points-actions';
import {usePartnerTaskSelector} from '../../../../store/points/points-selectors';
import {showInfoToast} from '../../../../utils/toast.utils';
import {TaskItem} from '../task-item/task-item';
import {TaskStatus} from '../task-status/task-status';

const LinksRecord: Record<string, string> = {
    [TaskTypeEnum.TorchFinance_Telegram]: 'https://t.me/oxcurdle',
    [TaskTypeEnum.TorchFinance_Twitter]: 'https://x.com/TorchTon',
    [TaskTypeEnum.SnapX_Telegram]: 'https://t.me/SnapX_official',
    [TaskTypeEnum.SnapX_Twitter]: 'https://x.com/snapx_co',
    [TaskTypeEnum.AppsCenter_Telegram]: 'https://t.me/+eTPf2XXxBixhMTgy',
    [TaskTypeEnum.AppsCenter_Bot]:
        'https://t.me/tapps_bot/app?startapp=promo_rainbow_swap',
    [TaskTypeEnum.JVault_Telegram]: 'https://t.me/JVault',
    [TaskTypeEnum.JVault_Staking]: 'https://jvault.xyz/staking'
};

interface Props {
    imageSrc: string;
    title: string;
    taskType: TaskTypeEnum;
    isTelegram?: boolean;
    isWalletAddressRequired?: boolean;
}

export const PartnerTaskItem: FC<Props> = ({
    imageSrc,
    title,
    taskType,
    isTelegram = false,
    isWalletAddressRequired = false
}) => {
    const dispatch = useDispatch();
    const walletAddress = useWalletAddress();

    const partnerTask = usePartnerTaskSelector(taskType);

    const handleClick = () => {
        if (isWalletAddressRequired && !isDefined(walletAddress)) {
            showInfoToast('Please, connect wallet');
        } else {
            const link = LinksRecord[taskType];

            isTelegram
                ? window.Telegram.WebApp.openTelegramLink(link)
                : window.Telegram.WebApp.openLink(link);
            if (partnerTask.data === 0) {
                dispatch(
                    checkPartnerTaskActions.submit({taskType, walletAddress})
                );
            }
        }
    };

    return (
        <TaskItem
            imageSrc={imageSrc}
            title={title}
            description="+1,000 points"
            onClick={handleClick}
        >
            <TaskStatus
                points={partnerTask.data}
                isLoading={partnerTask.isLoading}
            />
        </TaskItem>
    );
};
