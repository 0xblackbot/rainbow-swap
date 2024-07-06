import {TonClient} from '@ton/ton';
import axios from 'axios';
import {Api, HttpClient} from 'tonapi-sdk-js';

import {COIN_GECKO_API_KEY} from './secrets';
import {toNano} from './utils/big-int.utils';

export const isProd = import.meta.env.PROD;
export const PROD_STATE_VERSION = 1;

export const TELEMETREE_PROJECT_ID = '9c1d05ed-9d31-47c2-867b-8439928dc80e';
export const TELEMETREE_API_KEY = 'c72dec3a-c0de-4ec0-b1fa-5b110e4227a5';
export const TELEMETREE_APP_NAME = 'shared.blackbot';

export const TON = 'ton';
export const TON_DECIMALS = 9;
export const USDT = 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs';
export const WORKCHAIN = 0;

export const DEBOUNCE_DUE_TIME = 300;
export const REFRESH_ROUTE_INTERVAL = 30 * 1000;

export const GAS_AMOUNT = toNano('0.255', 9);
export const JETTON_TRANSFER_GAS_AMOUNT = toNano('0.065', 9);

export const API = axios.create({
    baseURL: 'https://api.blackbot.technology/rainbow/api'
});
export const TON_CLIENT = new TonClient({
    endpoint: `https://api.blackbot.technology/ton-http-api/jsonRPC`
});

export const COIN_GECKO_API = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    headers: {
        'x-cg-demo-api-key': COIN_GECKO_API_KEY
    }
});

export const TON_API_CLIENT = new Api(
    new HttpClient({
        baseUrl: 'https://tonapi.io'
    })
);

export const GA_MEASUREMENT_ID = isProd ? 'G-BY9LWCELFX' : 'G-GLSCG1EMDB';
