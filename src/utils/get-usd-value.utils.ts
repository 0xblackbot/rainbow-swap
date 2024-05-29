import {fromNano} from './big-int.utils';
import {Asset} from '../interfaces/asset.interface';

export const getUsdExchangeRate = (tonPrice: number, asset: Asset) =>
    tonPrice / parseFloat(fromNano(BigInt(asset.exchangeRate), asset.decimals));
