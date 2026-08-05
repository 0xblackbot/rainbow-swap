import styles from './footer.module.css';
import {ChatIcon} from '../../assets/icons/ChatIcon/ChatIcon';
import {GitbookIcon} from '../../assets/icons/GitbookIcon/GitbookIcon';
import {GithubIcon} from '../../assets/icons/GithubIcon/GithubIcon';
import {TelegramIcon} from '../../assets/icons/TelegramIcon/TelegramIcon';
import {TwitterIcon} from '../../assets/icons/TwitterIcon/TwitterIcon';
import {PRIVACY_LINK, TERMS_LINK} from '../../compliance/compliance.constants';
import {
    BLACKBOT_LINK,
    GITBOOK_LINK,
    GITHUB_LINK,
    SUPPORT_LINK,
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
                    rel="noreferrer noopener"
                    aria-label="Twitter"
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
                    rel="noreferrer noopener"
                    aria-label="Telegram channel"
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
                    rel="noreferrer noopener"
                    aria-label="Gitbook documentation"
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
                    rel="noreferrer noopener"
                    aria-label="GitHub repository"
                >
                    <GithubIcon width={iconSize} height={iconSize} />
                </a>
                <a
                    className={getClassName(
                        styles.container_a,
                        styles.container_icon,
                        styles.support_button
                    )}
                    href={SUPPORT_LINK}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Support chat"
                >
                    <ChatIcon width={iconSize} height={iconSize} />
                    Support
                </a>
            </div>
            <div
                className={getClassName(styles.container_row, styles.legal_row)}
            >
                <p className={styles.copyright_text}>
                    <a
                        className={styles.container_a}
                        href={BLACKBOT_LINK}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Blackbot
                    </a>{' '}
                    © {currentYear}
                </p>
                <nav className={styles.legal_links} aria-label="Legal">
                    <a className={styles.container_a} href={TERMS_LINK}>
                        Terms
                    </a>
                    <a className={styles.container_a} href={PRIVACY_LINK}>
                        Privacy
                    </a>
                </nav>
            </div>
        </div>
    </ContentContainer>
);
