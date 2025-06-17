import {formatNumber} from './format-number.utils';

export const calcPercentDiff = (
    inputAssetUsdAmount: number,
    outputAssetUsdAmount: number
): number | undefined => {
    if (!inputAssetUsdAmount || !outputAssetUsdAmount) return undefined;

    return (
        ((outputAssetUsdAmount - inputAssetUsdAmount) / inputAssetUsdAmount) *
        100
    );
};

export const formatPercentDiff = (percent?: number): string | undefined => {
    if (percent === undefined) return undefined;

    return `(${percent >= 0 ? '+' : ''}${formatNumber(percent, 2)}%)`;
};
