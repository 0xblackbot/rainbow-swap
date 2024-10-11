import {PartnerTasksKeyRecord, TaskTypeEnum} from '../../enums/task-type.enum';
import {useSelector} from '../index';
import {createEntity} from '../utils/create-entity';

export const useIsPointsModalOpenSelector = () =>
    useSelector(({points}) => points.isModalOpen);

export const usePointsSelector = () =>
    useSelector(({points}) => {
        let partnersPoints = 0;

        for (const value of Object.values(points.partners)) {
            partnersPoints += value.data;
        }

        return {
            data:
                points.localTapTap +
                points.tapTap.data +
                points.swapsVolume.data +
                points.bonus.data +
                points.referral.data +
                points.telegramChannel.data +
                points.xChannel.data +
                points.tonApp.data +
                partnersPoints,
            isLoading: points.tapTap.isLoading
        };
    });

const REF_BONUS = 5000;

export const useNumberOfReferralsSelector = () =>
    useSelector(({points}) => points.referral.data / REF_BONUS);

export const useTelegramChannelTaskSelector = () =>
    useSelector(({points}) => points.telegramChannel);
export const useXChannelTaskSelector = () =>
    useSelector(({points}) => points.xChannel);
export const useTonAppTaskSelector = () =>
    useSelector(({points}) => points.tonApp);

export const usePartnerTaskSelector = (taskType: TaskTypeEnum) =>
    useSelector(({points}) => {
        const taskKey = PartnerTasksKeyRecord[taskType];

        return points.partners[taskKey] ?? createEntity(0);
    });

export const useRefHashSelector = () =>
    useSelector(({points}) => points.refHash);
