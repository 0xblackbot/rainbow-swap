import referralImage from './assets/referral.png';
import telegramImage from './assets/telegram.png';
import twitterImage from './assets/twitter.png';
import {TaskItem} from './task-item/task-item';
import {TaskStatus} from './task-status/task-status';
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
    checkXChannelTaskActions
} from '../../../store/points/points-actions';
import {
    useTelegramChannelTaskSelector,
    useXChannelTaskSelector
} from '../../../store/points/points-selectors';

export const Tasks = () => {
    const dispatch = useDispatch();

    const telegramChannelTask = useTelegramChannelTaskSelector();
    const xChannelTask = useXChannelTaskSelector();

    const handleShareClick = () => {
        const refUrl = `${TELEGRAM_APP_LINK}?startapp=${UNSAFE_INIT_DATA.userId}`;
        const url = `https://t.me/share/url?url=${refUrl}`;

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

    return (
        <>
            <p className={styles.title}>Earn more</p>
            <TaskItem
                imageSrc={referralImage}
                title="Invite friends"
                description="+500 points per 1 friend"
                onClick={handleShareClick}
            >
                <p className={styles.invite_button}>Invite</p>
            </TaskItem>
            <TaskItem
                imageSrc={telegramImage}
                title="Join Channel"
                description="+200 points"
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
                description="+200 points"
                onClick={handleFollowXClick}
            >
                <TaskStatus
                    points={xChannelTask.data}
                    isLoading={xChannelTask.isLoading}
                />
            </TaskItem>
        </>
    );
};
