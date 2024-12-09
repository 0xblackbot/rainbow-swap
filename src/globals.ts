import {isNotEmptyString} from '@rnw-community/shared';
import axios from 'axios';

import {toNano} from './utils/big-int.utils';

export const BASE_URL = import.meta.env.VITE_BASE_URL ?? '/';

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
    baseURL: 'https://api.rainbow.ag/api'
});

export const GA_MEASUREMENT_ID = isProd ? 'G-BY9LWCELFX' : 'G-GLSCG1EMDB';

export const INIT_DATA = window.Telegram.WebApp.initData;
export const IS_TMA = isNotEmptyString(INIT_DATA);

export const UNSAFE_INIT_DATA = {
    userId: window.Telegram.WebApp.initDataUnsafe.user?.id,
    refParent: window.Telegram.WebApp.initDataUnsafe.start_param,
    refWallet: new URLSearchParams(window.location.search).get('r')
};

export const WEB_LINK = 'https://rainbow.ag';
export const TELEGRAM_BOT_LINK = 'https://t.me/rainbow_swap_bot';
export const TELEGRAM_APP_LINK = `${TELEGRAM_BOT_LINK}/app`;
export const TELEGRAM_CHANNEL_LINK = 'https://t.me/rainbow_swap';
export const COMMUNITY_CHAT_LINK = 'https://t.me/rainbow_swap_chat';
export const SUPPORT_CHAT_LINK = 'https://t.me/rainbow_swap_community/3766';
export const TWITTER_LINK = 'https://x.com/rainbow_swap';
export const GITBOOK_LINK = 'https://rainbow-ag.gitbook.io/docs';
export const GITHUB_LINK = 'https://github.com/0xblackbot/rainbow-swap';
export const BLACKBOT_LINK = 'https://blackbot.technology/';
