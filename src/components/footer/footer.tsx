import styles from './footer.module.css';
import {COMMUNITY_CHAT_LINK, TELEGRAM_CHANNEL_LINK} from '../../globals';
import {getClassName} from '../../utils/style.utils';

const currentYear = new Date().getFullYear();

export const Footer = () => (
    <div className={styles.container}>
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
                Copyright © {currentYear} Blackbot
            </p>
        </div>
    </div>
);
