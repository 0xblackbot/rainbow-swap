import {TaskTypeEnum} from '../../enums/task-type.enum';
import {useSelector} from '../index';
import {createEntity} from '../utils/create-entity';

export const usePointsSelector = () =>
    useSelector(({pointsV2}) => {
        const walletPoints =
            pointsV2.walletPoints.data.bonusPoints +
            pointsV2.walletPoints.data.tapTapPoints +
            pointsV2.walletPoints.data.referralPoints +
            pointsV2.walletPoints.data.swapVolumePoints;

        let tasksPoints = 0;

        for (const value of Object.values(pointsV2.tasksState)) {
            tasksPoints += value.data;
        }

        return walletPoints + tasksPoints;
    });

export const useNumberOfReferralsSelector = () =>
    useSelector(
        ({pointsV2}) =>
            pointsV2.walletPoints.data.referralState.usersReferred +
            pointsV2.walletPoints.data.referralState.walletsReferred
    );

const EMPTY_TASK_STATE = createEntity(0);

export const useTaskSelector = (taskType: TaskTypeEnum) =>
    useSelector(
        ({pointsV2}) => pointsV2.tasksState[taskType] ?? EMPTY_TASK_STATE
    );
