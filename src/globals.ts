import {TonClient} from '@ton/ton';
import axios from 'axios';

import {toNano} from './utils/big-int.utils';

export const TON = 'ton';
export const WORKCHAIN = 0;

export const GAS_AMOUNT = toNano('0.255', 9);
export const JETTON_TRANSFER_GAS_AMOUNT = toNano('0.065', 9);

export const API = axios.create({
    baseURL: 'http://93.188.34.207/api'
});

export const TON_CLIENT = new TonClient({
    endpoint: `http://65.109.108.204:8088/jsonRPC`
});
