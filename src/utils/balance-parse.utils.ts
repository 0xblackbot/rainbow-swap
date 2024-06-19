import {fromNano} from './big-int.utils';

export const parseBalance = (balance: string, decimals: number) =>
    Number(fromNano(BigInt(balance), decimals));
