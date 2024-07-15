import {Asset} from 'rainbow-swap-sdk';

import {fromNano} from './big-int.utils';

export const getUsdExchangeRate = (tonPrice: number, asset: Asset) =>
    tonPrice / parseFloat(fromNano(BigInt(asset.exchangeRate), asset.decimals));
