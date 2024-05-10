import {Address, Cell} from '@ton/ton';

export const DEDUST_FACTORY_ADDRESS =
    'EQBfBWT7X2BHg9tXAxzhz2aKiNTU1tpt5NsiK0uSDW_YAJ67';

export interface SwapStep {
    poolAddress: Address;
    limit?: bigint;
    next?: SwapStep;
}

export interface SwapParams {
    deadline?: number;
    recipientAddress?: Address | null;
    referralAddress?: Address | null;
    fulfillPayload?: Cell | null;
    rejectPayload?: Cell | null;
}
