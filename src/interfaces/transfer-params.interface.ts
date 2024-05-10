import {Address, Cell} from '@ton/core';

export interface TransferParams {
    to: Address;
    value: bigint;
    body: Cell;
}
