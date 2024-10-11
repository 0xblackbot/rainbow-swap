import appsCenter from './assets/apps-center.jpg';
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
import {TaskHeader} from './task-header/task-header';
import {TaskItem} from './task-item/task-item';
import {TaskStatus} from './task-status/task-status';
import {TasksEnd} from './tasks-end/tasks-end';
import styles from './tasks.module.css';
import {TaskTypeEnum} from '../../../enums/task-type.enum';
import {TELEGRAM_CHANNEL_LINK, TON_APP_LINK, X_LINK} from '../../../globals';
import {useDispatch} from '../../../store';
import {
    checkTelegramChannelTaskActions,
    checkTonAppTaskActions,
    checkXChannelTaskActions,
    closePointsModal
} from '../../../store/points/points-actions';
import {
    useTelegramChannelTaskSelector,
    useTonAppTaskSelector,
    useXChannelTaskSelector
} from '../../../store/points/points-selectors';

export const Tasks = () => {
    const dispatch = useDispatch();

    const telegramChannelTask = useTelegramChannelTaskSelector();
    const xChannelTask = useXChannelTaskSelector();
    const tonAppTask = useTonAppTaskSelector();

    const handleSwap = () => dispatch(closePointsModal());

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

            <p className={styles.title}>Tasks</p>

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

            <Divider withArrow={true} />

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

            <Divider withArrow={true} />

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
                isWalletAddressRequired={true}
            />

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
