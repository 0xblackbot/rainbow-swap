import {Address, Cell, StateInit} from '@ton/core';

export interface TransferParams {
    to: Address;
    value: bigint;
    init?: StateInit;
    body?: Cell;
}
