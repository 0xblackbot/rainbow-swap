import referralImage from './assets/referral.png';
import telegramImage from './assets/telegram.png';
import torchFinanceImage from './assets/torch-finance.jpeg';
import twitterImage from './assets/twitter.png';
import {Divider} from './divider/divider';
import {TaskHeader} from './task-header/task-header';
import {TaskItem} from './task-item/task-item';
import {TaskStatus} from './task-status/task-status';
import {TasksEnd} from './tasks-end/tasks-end';
import styles from './tasks.module.css';
import {
    TELEGRAM_APP_LINK,
    TELEGRAM_CHANNEL_LINK,
    UNSAFE_INIT_DATA,
    X_LINK
} from '../../../globals';
import {useDispatch} from '../../../store';
import {
    checkTelegramChannelTaskActions,
    checkTorchFinanceTelegramTaskActions,
    checkTorchFinanceTwitterTaskActions,
    checkXChannelTaskActions
} from '../../../store/points/points-actions';
import {
    useTelegramChannelTaskSelector,
    useTorchFinanceTelegramSelector,
    useTorchFinanceTwitterSelector,
    useXChannelTaskSelector
} from '../../../store/points/points-selectors';
import {copyToClipboard} from '../../../utils/clipboard.utils';
import {showSuccessToast} from '../../../utils/toast.utils';

const REF_URL = `${TELEGRAM_APP_LINK}?startapp=${UNSAFE_INIT_DATA.userId}`;

const TORCH_FINANCE_LINKS = {
    telegram: 'https://t.me/oxcurdle',
    twitter: 'https://x.com/TorchTon'
};

export const Tasks = () => {
    const dispatch = useDispatch();

    const telegramChannelTask = useTelegramChannelTaskSelector();
    const xChannelTask = useXChannelTaskSelector();
    const torchFinanceTelegramTask = useTorchFinanceTelegramSelector();
    const torchFinanceTwitterTask = useTorchFinanceTwitterSelector();

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

    const handleTorchTelegramClick = () => {
        window.Telegram.WebApp.openTelegramLink(TORCH_FINANCE_LINKS.telegram);
        if (torchFinanceTelegramTask.data === 0) {
            dispatch(checkTorchFinanceTelegramTaskActions.submit());
        }
    };

    const handleTorchTwitterClick = () => {
        window.Telegram.WebApp.openLink(TORCH_FINANCE_LINKS.twitter);
        if (torchFinanceTwitterTask.data === 0) {
            dispatch(checkTorchFinanceTwitterTaskActions.submit());
        }
    };

    return (
        <>
            <Divider />

            <p className={styles.title}>Earn more</p>
            <TaskItem
                imageSrc={referralImage}
                title="Invite friends"
                description="+5000 points per 1 friend"
                onClick={handleCopyClick}
            >
                <p className={styles.invite_button} onClick={handleInviteClick}>
                    Invite
                </p>
            </TaskItem>
            <TaskItem
                imageSrc={telegramImage}
                title="Join Channel"
                description="+2000 points"
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
                description="+2000 points"
                onClick={handleFollowXClick}
            >
                <TaskStatus
                    points={xChannelTask.data}
                    isLoading={xChannelTask.isLoading}
                />
            </TaskItem>

            <Divider />

            <TaskHeader name="Torch Finance" imageSrc={torchFinanceImage} />
            <TaskItem
                imageSrc={telegramImage}
                title="Join Telegram"
                description="+1000 points"
                onClick={handleTorchTelegramClick}
            >
                <TaskStatus
                    points={torchFinanceTelegramTask.data}
                    isLoading={torchFinanceTelegramTask.isLoading}
                />
            </TaskItem>
            <TaskItem
                imageSrc={twitterImage}
                title="Follow X"
                description="+1000 points"
                onClick={handleTorchTwitterClick}
            >
                <TaskStatus
                    points={torchFinanceTwitterTask.data}
                    isLoading={torchFinanceTwitterTask.isLoading}
                />
            </TaskItem>

            <TasksEnd />
        </>
    );
};
