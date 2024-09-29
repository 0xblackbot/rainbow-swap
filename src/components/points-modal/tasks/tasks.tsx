import appsCenter from './assets/apps-center.jpg';
import inviteImage from './assets/invite.png';
import referralImage from './assets/referral.png';
import snapxImage from './assets/snapx.jpg';
import telegramImage from './assets/telegram.png';
import tonAppImage from './assets/ton-app.png';
import torchFinanceImage from './assets/torch-finance.jpeg';
import twitterImage from './assets/twitter.png';
import {Divider} from './divider/divider';
import {PartnerTaskItem} from './partner-task-item/partner-task-item';
import {TaskHeader} from './task-header/task-header';
import {TaskItem} from './task-item/task-item';
import {TaskStatus} from './task-status/task-status';
import {TasksEnd} from './tasks-end/tasks-end';
import styles from './tasks.module.css';
import {TaskTypeEnum} from '../../../enums/task-type.enum';
import {
    TELEGRAM_APP_LINK,
    TELEGRAM_CHANNEL_LINK,
    TON_APP_LINK,
    X_LINK
} from '../../../globals';
import {useDispatch} from '../../../store';
import {
    checkTelegramChannelTaskActions,
    checkTonAppTaskActions,
    checkXChannelTaskActions,
    closePointsModal
} from '../../../store/points/points-actions';
import {
    useRefHashSelector,
    useTelegramChannelTaskSelector,
    useTonAppTaskSelector,
    useXChannelTaskSelector
} from '../../../store/points/points-selectors';
import {copyToClipboard} from '../../../utils/clipboard.utils';
import {showSuccessToast} from '../../../utils/toast.utils';

export const Tasks = () => {
    const dispatch = useDispatch();

    const telegramChannelTask = useTelegramChannelTaskSelector();
    const xChannelTask = useXChannelTaskSelector();
    const tonAppTask = useTonAppTaskSelector();

    const refHash = useRefHashSelector();
    const REF_URL = `${TELEGRAM_APP_LINK}?startapp=${refHash}`;

    const handleSwap = () => dispatch(closePointsModal());

    const handleCopyClick = async () => {
        await copyToClipboard(REF_URL);
        showSuccessToast('Link copied!');
    };

    const handleInviteClick = (
        event: React.MouseEvent<HTMLParagraphElement, MouseEvent>
    ) => {
        event.stopPropagation();

        const url = `https://t.me/share/url?url=${REF_URL}`;
        window.Telegram.WebApp.openTelegramLink(url);
    };

    const handleJoinChannelClick = () => {
        window.Telegram.WebApp.openTelegramLink(TELEGRAM_CHANNEL_LINK);
        if (telegramChannelTask.data === 0) {
            dispatch(checkTelegramChannelTaskActions.submit());
        }
    };

    const handleFollowXClick = () => {
        window.Telegram.WebApp.openLink(X_LINK);
        if (xChannelTask.data === 0) {
            dispatch(checkXChannelTaskActions.submit());
        }
    };

    const handleTonAppClick = () => {
        window.Telegram.WebApp.openLink(TON_APP_LINK);
        if (tonAppTask.data === 0) {
            dispatch(checkTonAppTaskActions.submit());
        }
    };

    return (
        <>
            <Divider withArrow={true} />

            <p className={styles.title}>Earn more</p>
            <TaskItem
                imageSrc={referralImage}
                title="Perform trades"
                description="+5,000 per $100+ swap"
                onClick={handleSwap}
            >
                <p className={styles.invite_button} onClick={handleSwap}>
                    Swap
                </p>
            </TaskItem>
            <TaskItem
                imageSrc={inviteImage}
                title="Invite friends"
                description="+5,000 per 1 friend"
                onClick={handleCopyClick}
            >
                <p className={styles.invite_button} onClick={handleInviteClick}>
                    Invite
                </p>
            </TaskItem>
            <TaskItem
                imageSrc={telegramImage}
                title="Join Channel"
                description="+2,000 points"
                onClick={handleJoinChannelClick}
            >
                <TaskStatus
                    points={telegramChannelTask.data}
                    isLoading={telegramChannelTask.isLoading}
                />
            </TaskItem>
            <TaskItem
                imageSrc={twitterImage}
                title="Follow X"
                description="+2,000 points"
                onClick={handleFollowXClick}
            >
                <TaskStatus
                    points={xChannelTask.data}
                    isLoading={xChannelTask.isLoading}
                />
            </TaskItem>
            <TaskItem
                imageSrc={tonAppImage}
                title="Leave a review"
                description="+10,000 points"
                onClick={handleTonAppClick}
            >
                <TaskStatus
                    points={tonAppTask.data}
                    isLoading={tonAppTask.isLoading}
                />
            </TaskItem>

            <Divider withArrow={true} />

            <TaskHeader name="Telegram Apps Center" imageSrc={appsCenter} />
            <PartnerTaskItem
                isTelegram={true}
                imageSrc={telegramImage}
                title="Join Channel"
                taskType={TaskTypeEnum.AppsCenter_Telegram}
            />
            <PartnerTaskItem
                isTelegram={true}
                imageSrc={telegramImage}
                title="Explore Telegram Apps"
                taskType={TaskTypeEnum.AppsCenter_Bot}
            />

            <Divider withArrow={true} />

            <TaskHeader name="Torch Finance" imageSrc={torchFinanceImage} />
            <PartnerTaskItem
                isTelegram={true}
                imageSrc={telegramImage}
                title="Join Channel"
                taskType={TaskTypeEnum.TorchFinance_Telegram}
            />
            <PartnerTaskItem
                imageSrc={twitterImage}
                title="Follow X"
                taskType={TaskTypeEnum.TorchFinance_Twitter}
            />

            <Divider withArrow={true} />

            <TaskHeader name="SnapX" imageSrc={snapxImage} />
            <PartnerTaskItem
                isTelegram={true}
                imageSrc={telegramImage}
                title="Join Channel"
                taskType={TaskTypeEnum.SnapX_Telegram}
            />
            <PartnerTaskItem
                imageSrc={twitterImage}
                title="Follow X"
                taskType={TaskTypeEnum.SnapX_Twitter}
            />

            <TasksEnd />
        </>
    );
};
