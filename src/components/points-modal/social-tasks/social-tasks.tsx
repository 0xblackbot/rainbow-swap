import {EmptyFn} from '@rnw-community/shared';
import {FC} from 'react';

import appsCenter from './assets/apps-center.jpg';
import gemswallImage from './assets/gemswall.jpeg';
import jvaultImage from './assets/jvault.jpeg';
import parratonImage from './assets/parraton.jpeg';
import referralImage from './assets/referral.png';
import snapxImage from './assets/snapx.jpg';
import stakingImage from './assets/staking.png';
import telegramImage from './assets/telegram.png';
import tonAppImage from './assets/ton-app.png';
import tonHedgeImage from './assets/ton-hedge.jpeg';
import torchFinanceImage from './assets/torch-finance.jpeg';
import twitterImage from './assets/twitter.png';
import {Divider} from './divider/divider';
import {PartnerTaskItem} from './partner-task-item/partner-task-item';
import styles from './social-tasks.module.css';
import {TaskHeader} from './task-header/task-header';
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

                    <Divider withArrow={true} className={styles.divider} />

                    <TaskHeader name="GemsWall" imageSrc={gemswallImage} />
                    <PartnerTaskItem
                        isTelegram={true}
                        imageSrc={telegramImage}
                        title="Explore app"
                        taskType={TaskTypeEnum.GemsWall_Bot}
                    />
                    <PartnerTaskItem
                        imageSrc={twitterImage}
                        title="Follow X"
                        taskType={TaskTypeEnum.GemsWall_Twitter}
                    />

                    <Divider withArrow={true} className={styles.divider} />

                    <TaskHeader name="Parraton" imageSrc={parratonImage} />
                    <PartnerTaskItem
                        isTelegram={true}
                        imageSrc={telegramImage}
                        title="Join Channel"
                        taskType={TaskTypeEnum.Parraton_Telegram}
                    />
                    <PartnerTaskItem
                        isTelegram={true}
                        imageSrc={telegramImage}
                        title="Explore app"
                        taskType={TaskTypeEnum.Parraton_Bot}
                    />

                    <Divider withArrow={true} className={styles.divider} />

                    <TaskHeader name="TON Hedge" imageSrc={tonHedgeImage} />
                    <PartnerTaskItem
                        isTelegram={true}
                        imageSrc={telegramImage}
                        title="Join Channel"
                        taskType={TaskTypeEnum.TonHedge_Telegram}
                    />
                    <PartnerTaskItem
                        isTelegram={true}
                        imageSrc={telegramImage}
                        title="Explore app"
                        taskType={TaskTypeEnum.TonHedge_Bot}
                    />

                    <Divider withArrow={true} className={styles.divider} />

                    <TaskHeader name="JVault" imageSrc={jvaultImage} />
                    <PartnerTaskItem
                        isTelegram={true}
                        imageSrc={telegramImage}
                        title="Join Channel"
                        taskType={TaskTypeEnum.JVault_Telegram}
                    />
                    <PartnerTaskItem
                        imageSrc={stakingImage}
                        title="Stake any token"
                        taskType={TaskTypeEnum.JVault_Staking}
                    />

                    <Divider withArrow={true} className={styles.divider} />

                    <TaskHeader
                        name="Telegram Apps Center"
                        imageSrc={appsCenter}
                    />
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

                    <Divider withArrow={true} className={styles.divider} />

                    <TaskHeader
                        name="Torch Finance"
                        imageSrc={torchFinanceImage}
                    />
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

                    <Divider withArrow={true} className={styles.divider} />

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
