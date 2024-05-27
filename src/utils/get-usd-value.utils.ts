import {fromNano} from './big-int.utils';

export const getUsdValue = (
    inputValue: string,
    tonPrice: number,
    assetExchangeRate: string,
    assetDecimals: number
) =>
    (parseFloat(inputValue) /
        parseFloat(fromNano(BigInt(assetExchangeRate), assetDecimals))) *
    tonPrice;
