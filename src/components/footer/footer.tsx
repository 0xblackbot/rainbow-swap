import styles from './footer.module.css';
import {ChatIcon} from '../../assets/icons/ChatIcon/ChatIcon';
import {GitbookIcon} from '../../assets/icons/GitbookIcon/GitbookIcon';
import {GithubIcon} from '../../assets/icons/GithubIcon/GithubIcon';
import {TelegramIcon} from '../../assets/icons/TelegramIcon/TelegramIcon';
import {TwitterIcon} from '../../assets/icons/TwitterIcon/TwitterIcon';
import {
    BLACKBOT_LINK,
    COMMUNITY_CHAT_LINK,
    GITBOOK_LINK,
    GITHUB_LINK,
    TELEGRAM_CHANNEL_LINK,
    TWITTER_LINK
} from '../../globals';
import {ContentContainer} from '../../shared/content-container/content-container';
import {getClassName} from '../../utils/style.utils';

const currentYear = new Date().getFullYear();
const iconSize = 24;

export const Footer = () => (
    <ContentContainer className={styles.container}>
        <div className={styles.inner_container}>
            <div className={styles.container_row}>
                <a
                    className={getClassName(
                        styles.container_a,
                        styles.container_icon
                    )}
                    href={TWITTER_LINK}
                    target="_blank"
                >
                    <TwitterIcon width={iconSize} height={iconSize} />
                </a>
                <a
                    className={getClassName(
                        styles.container_a,
                        styles.container_icon
                    )}
                    href={TELEGRAM_CHANNEL_LINK}
                    target="_blank"
                >
                    <TelegramIcon width={iconSize} height={iconSize} />
                </a>
                <a
                    className={getClassName(
                        styles.container_a,
                        styles.container_icon
                    )}
                    href={GITBOOK_LINK}
                    target="_blank"
                >
                    <GitbookIcon width={iconSize} height={iconSize} />
                </a>
                <a
                    className={getClassName(
                        styles.container_a,
                        styles.container_icon
                    )}
                    href={GITHUB_LINK}
                    target="_blank"
                >
                    <GithubIcon width={iconSize} height={iconSize} />
                </a>
                <a
                    className={getClassName(
                        styles.container_a,
                        styles.container_icon,
                        styles.support_button
                    )}
                    href={COMMUNITY_CHAT_LINK}
                    target="_blank"
                >
                    <ChatIcon width={iconSize} height={iconSize} />
                    Support
                </a>
            </div>
            <div className={styles.container_row}>
                <p className={styles.copyright_text}>
                    <a
                        className={styles.container_a}
                        href={BLACKBOT_LINK}
                        target="_blank"
                    >
                        Blackbot
                    </a>{' '}
                    © {currentYear}
                </p>
            </div>
        </div>
    </ContentContainer>
);
