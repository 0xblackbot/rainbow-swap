import {isDefined} from '@rnw-community/shared';
import {beginCell, StateInit, storeStateInit} from '@ton/core';

import {cellToBase64} from './boc.utils.ts';
import {randomIntFromInterval} from './math.utils';

export const getQueryId = () => randomIntFromInterval(1, 10 ** 6);

export const getStateInit = (init?: StateInit) => {
    if (!isDefined(init)) {
        return undefined;
    }

    const cell = beginCell().store(storeStateInit(init)).endCell();

    return cellToBase64(cell);
};
