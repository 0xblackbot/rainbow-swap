import {Cell} from '@ton/core';

export const bocToCell = (boc: string) =>
    Cell.fromBoc(Buffer.from(boc, 'base64'))[0];
