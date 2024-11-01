import {SwapStatus} from '../enums/swap-status.enum';
import {OnchainSwap} from '../store/interfaces/on-chain-swap.interface';

export const getStatus = (swap: OnchainSwap) => {
    if (swap.successNanoInputAssetAmount === swap.nanoInputAssetAmount) {
        return SwapStatus.Success;
    }

    if (swap.successNanoInputAssetAmount === '0') {
        return SwapStatus.Failed;
    }

    return SwapStatus.PartiallyFilled;
};
