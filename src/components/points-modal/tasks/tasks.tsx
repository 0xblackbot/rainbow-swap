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
import {TasksEnd} from './tasks-end/tasks-end';
import styles from './tasks.module.css';
import {TaskTypeEnum} from '../../../enums/task-type.enum';
import {useDispatch} from '../../../store';
import {closePointsModal} from '../../../store/points/points-actions';
import {Button} from '../../button/button';

export const Tasks = () => {
    const dispatch = useDispatch();

    const handleSwap = () => dispatch(closePointsModal());

    return (
        <>
            <Divider withArrow={true} className={styles.divider} />

            <p className={styles.title}>Earn more</p>

            <TaskItem
                imageSrc={referralImage}
                title="Perform trades"
                description="+5,000 per $100+ swap"
                onClick={handleSwap}
            >
                <Button size="xs" mode="bezeled" onClick={handleSwap}>
                    <span>Swap</span>
                </Button>
            </TaskItem>
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
                isWalletAddressRequired={true}
            />

            <Divider withArrow={true} className={styles.divider} />

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

            <Divider withArrow={true} className={styles.divider} />

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

            <TasksEnd />
        </>
    );
};
