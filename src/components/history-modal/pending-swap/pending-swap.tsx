import {HistorySoon} from './history-soon/history-soon';
import {PendingProgress} from './pending-progress/pending-progress';
import {PendingResult} from './pending-result/pending-result';
import {
    usePendingBocHashSelector,
    usePendingSwapResultSelector
} from '../../../store/wallet/wallet-selectors';

export const PendingSwap = () => {
    const bocHash = usePendingBocHashSelector();
    const pendingSwapResult = usePendingSwapResultSelector();

    if (bocHash) {
        return <PendingProgress />;
    }

    if (pendingSwapResult) {
        return <PendingResult onchainSwap={pendingSwapResult} />;
    }

    return <HistorySoon />;
};
