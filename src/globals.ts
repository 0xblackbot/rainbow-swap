import {isNotEmptyString} from '@rnw-community/shared';
import axios from 'axios';
import {Api, HttpClient} from 'tonapi-sdk-js';

import {toNano} from './utils/big-int.utils';

export const BASE_URL = process.env.VITE_BASE_URL ?? '/';

export const isProd = import.meta.env.PROD;
export const PROD_STATE_VERSION = 1;

export const TON = 'ton';
export const TON_DECIMALS = 9;
export const USDT = 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs';

export const DEBOUNCE_DUE_TIME = 300;
export const REFRESH_ROUTE_INTERVAL = 30 * 1000;

export const GAS_AMOUNT = toNano('0.255', 9);
export const JETTON_TRANSFER_GAS_AMOUNT = toNano('0.065', 9);

export const API = axios.create({
    baseURL: 'https://api.blackbot.technology/rainbow/api'
});

export const TON_API_CLIENT = new Api(
    new HttpClient({
        baseUrl: 'https://tonapi.io'
    })
);

export const GA_MEASUREMENT_ID = isProd ? 'G-BY9LWCELFX' : 'G-GLSCG1EMDB';

export const INIT_DATA = window.Telegram.WebApp.initData;
export const IS_TMA = isNotEmptyString(INIT_DATA);

// On Android devices MainButton text updates only after touch
export const IS_MAIN_BUTTON_AVAILABLE =
    window.Telegram.WebApp.platform === 'ios';

export const UNSAFE_INIT_DATA = {
    userId: window.Telegram.WebApp.initDataUnsafe.user?.id,
    ref_parent: window.Telegram.WebApp.initDataUnsafe.start_param
};

export const TELEGRAM_BOT_LINK = 'https://t.me/rainbow_swap_bot';
export const TELEGRAM_APP_LINK = `${TELEGRAM_BOT_LINK}/app`;
export const TELEGRAM_CHANNEL_LINK = 'https://t.me/rainbow_swap';
export const COMMUNITY_CHAT_LINK = 'https://t.me/rainbow_swap_chat';
export const X_LINK = 'https://x.com/rainbow_swap';
export const TON_APP_LINK = 'https://ton.app/dex/rainbow-swap?id=2525';
