import {Cell} from '@ton/core';
import {Base64} from '@tonconnect/protocol';
import {Buffer} from 'buffer';

export const bocToCell = (boc: string) =>
    Cell.fromBoc(Buffer.from(boc, 'base64'))[0];

export const bocToHash = (boc: string) =>
    bocToCell(boc).hash(0).toString('hex');

export const cellToBase64 = (cell: Cell) => Base64.encode(cell.toBoc());
