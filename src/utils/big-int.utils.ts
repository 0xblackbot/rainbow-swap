export {toNano} from '@ton/core';

export const fromNano = (value: bigint, decimals: number) =>
    String(Number(value) / 10 ** decimals);
