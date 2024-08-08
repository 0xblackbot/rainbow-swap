import {useSelector} from '../index';

export const useIsPointsModalOpenSelector = () =>
    useSelector(({points}) => points.isModalOpen);

export const usePointsSelector = () =>
    useSelector(({points}) => ({
        data:
            points.localTapTap +
            points.tapTap.data +
            points.referral.data +
            points.telegramChannel.data +
            points.xChannel.data,
        isLoading: points.tapTap.isLoading
    }));

export const useTelegramChannelTaskSelector = () =>
    useSelector(({points}) => points.telegramChannel);
export const useXChannelTaskSelector = () =>
    useSelector(({points}) => points.xChannel);
