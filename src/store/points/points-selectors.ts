import {useSelector} from '../index';

export const useIsPointsModalOpenSelector = () =>
    useSelector(({points}) => points.isModalOpen);

export const usePointsSelector = () =>
    useSelector(
        ({points}) =>
            points.localTapTap +
            points.tapTap.data +
            points.referral.data +
            points.telegramChannel.data +
            points.xChannel.data
    );
