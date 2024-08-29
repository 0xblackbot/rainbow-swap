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
            points.xChannel.data +
            points.torchFinanceTelegram.data +
            points.torchFinanceTwitter.data,
        isLoading: points.tapTap.isLoading
    }));

export const useTelegramChannelTaskSelector = () =>
    useSelector(({points}) => points.telegramChannel);
export const useXChannelTaskSelector = () =>
    useSelector(({points}) => points.xChannel);

// TorchFinance
export const useTorchFinanceTelegramSelector = () =>
    useSelector(({points}) => points.torchFinanceTelegram);
export const useTorchFinanceTwitterSelector = () =>
    useSelector(({points}) => points.torchFinanceTwitter);
