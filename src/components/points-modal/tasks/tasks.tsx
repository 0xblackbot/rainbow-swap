import referralImage from './assets/referral.png';
import telegramImage from './assets/telegram.png';
import twitterImage from './assets/twitter.png';
import {TaskItem} from './task-item/task-item';
import styles from './tasks.module.css';
import {ChevronRightIcon} from '../../../assets/icons/ChevronRightIcon/ChevronRightIcon';
import {
    TELEGRAM_BOT_LINK,
    TELEGRAM_CHANNEL_LINK,
    USER_ID,
    X_LINK
} from '../../../globals';

export const Tasks = () => {
    const handleShareClick = () => {
        const refUrl = `${TELEGRAM_BOT_LINK}/app?startapp=${USER_ID}`;
        const url = `https://t.me/share/url?url=${refUrl}`;

        window.Telegram.WebApp.openTelegramLink(url);
    };

    const handleJoinChannelClick = () => {
        window.Telegram.WebApp.openTelegramLink(TELEGRAM_CHANNEL_LINK);
    };

    const handleFollowXClick = () => {
        window.Telegram.WebApp.openLink(X_LINK);
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
                <ChevronRightIcon width="20px" height="20px" />
            </TaskItem>
            <TaskItem
                imageSrc={twitterImage}
                title="Follow X"
                description="+200 points"
                onClick={handleFollowXClick}
            >
                <ChevronRightIcon width="20px" height="20px" />
            </TaskItem>
        </>
    );
};
