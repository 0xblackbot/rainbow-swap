import {Cell} from '@ton/core';
import {Buffer} from "buffer";

export const bocToCell = (boc: string) =>
    Cell.fromBoc(Buffer.from(boc, 'base64'))[0];
