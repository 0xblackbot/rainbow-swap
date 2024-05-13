import {randomIntFromInterval} from './math.utils';

export const getQueryId = () => randomIntFromInterval(1, 10 ** 6);
