import {EmptyFn} from '@rnw-community/shared';
import {FC} from 'react';

import {AdsGramTaskItem} from './adsgram-task-item/adsgram-task-item';
import referralImage from './assets/referral.png';
import telegramImage from './assets/telegram.png';
import tonAppImage from './assets/ton-app.png';
import twitterImage from './assets/twitter.png';
import {Divider} from './divider/divider';
import {PartnerTaskItem} from './partner-task-item/partner-task-item';
import styles from './social-tasks.module.css';
import {TaskItem} from './task-item/task-item';
import {TaskTypeEnum} from '../../../enums/task-type.enum';
import {IS_TMA, TELEGRAM_APP_LINK} from '../../../globals';
import {Button} from '../../button/button';

interface Props {
    onSwap: EmptyFn;
}

export const SocialTasks: FC<Props> = ({onSwap}) => {
    const handleOpenTelegram = () => window.open(TELEGRAM_APP_LINK, '_blank');

    return (
        <>
            <Divider withArrow={true} className={styles.divider} />

            <p className={styles.title}>Earn more</p>

            <TaskItem
                imageSrc={referralImage}
                title="Swap Tokens"
                description="+5,000 XP for every $100+ swap"
                onClick={onSwap}
            >
                <Button size="xs" mode="bezeled" onClick={onSwap}>
                    <span>Swap</span>
                </Button>
            </TaskItem>

            {IS_TMA ? (
                <>
                    <AdsGramTaskItem />
                    <PartnerTaskItem
                        isTelegram={true}
                        imageSrc={telegramImage}
                        title="Join Channel"
                        taskType={TaskTypeEnum.Telegram}
                    />
                    <PartnerTaskItem
                        imageSrc={twitterImage}
                        title="Follow X"
                        taskType={TaskTypeEnum.Twitter}
                    />
                    <PartnerTaskItem
                        imageSrc={tonAppImage}
                        title="Leave a review"
                        taskType={TaskTypeEnum.TonApp}
                    />
                </>
            ) : (
                <TaskItem
                    imageSrc={telegramImage}
                    title="More Tasks"
                    description="Discover new tasks in our Telegram app"
                    onClick={handleOpenTelegram}
                >
                    <Button
                        size="xs"
                        mode="bezeled"
                        Component="a"
                        href={TELEGRAM_APP_LINK}
                        target="_blank"
                    >
                        <span>Open Telegram</span>
                    </Button>
                </TaskItem>
            )}

            <div className={styles.footer} />
        </>
    );
};
