import styles from './footer.module.css';
import {useViewportHeight} from '../../hooks/viewport-height/viewport-height.hook';
import {getClassName} from '../../utils/style.utils';

const TELEGRAM_CHANNEL_LINK = 'https://t.me/rainbow_swap';
const COMMUNITY_CHAT_LINK = 'https://t.me/rainbow_swap_chat';

const CONTAINER_HEIGHT = 40;
const CONTAINER_MARGIN_BOTTOM = 20;

export const Footer = () => {
    const viewportHeight = useViewportHeight();
    const top =
        viewportHeight.value - (CONTAINER_HEIGHT + CONTAINER_MARGIN_BOTTOM);

    return (
        <div className={styles.container} style={{top}}>
            <div className={styles.container_row}>
                <a
                    className={getClassName(
                        styles.container_text,
                        styles.container_a
                    )}
                    href={TELEGRAM_CHANNEL_LINK}
                    target="_blank"
                >
                    Telegram Channel
                </a>
                <a
                    className={getClassName(
                        styles.container_text,
                        styles.container_a
                    )}
                    href={COMMUNITY_CHAT_LINK}
                    target="_blank"
                >
                    Community Chat
                </a>
            </div>
            <div className={styles.container_row}>
                <p className={styles.container_text}>
                    Copyright © 2024 Blackbot
                </p>
            </div>
        </div>
    );
};
