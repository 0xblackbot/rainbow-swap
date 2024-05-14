import {TransactionInfo} from '../../interfaces/transaction-info.interface.ts';
import {CalculatedSwapRoute} from '../../swap-routes/shared/calculated-swap-route.type.ts';
import {createActions} from '../utils/create-actions.ts';

export const loadSwapRoutesActions = createActions<
    {
        inputAssetAmount: string;
        inputAssetAddress: string;
        outputAssetAddress: string;
    },
    CalculatedSwapRoute[]
>('swap-route/LOAD_SWAP_ROUTES');

export const addPendingSwapTransactionActions = createActions<TransactionInfo>(
    'swap-route/ADD_PENDING_SWAP_TRANSACTION'
);
