import {emptyFn} from '@rnw-community/shared';
import {Asset} from 'rainbow-swap-sdk';
import {Dispatch, SetStateAction, createContext} from 'react';

import {TON, USDT} from '../../globals';

interface SwapFormContextValues {
    outputAssetAddress: string;
    setOutputAssetAddress: Dispatch<SetStateAction<string>>;
    inputAssetAddress: string;
    setInputAssetAddress: Dispatch<SetStateAction<string>>;
    inputAssetAmount: string;
    setInputAssetAmount: Dispatch<SetStateAction<string>>;
    inputAsset: Asset;
    outputAsset: Asset;
}

export const SwapFormContext = createContext<SwapFormContextValues>({
    outputAssetAddress: USDT,
    setOutputAssetAddress: emptyFn,
    inputAssetAddress: TON,
    setInputAssetAddress: emptyFn,
    inputAssetAmount: '',
    setInputAssetAmount: emptyFn,
    inputAsset: {
        address: TON,
        slug: 'TON',
        decimals: 9,
        exchangeRate: '0',
        usdExchangeRate: 0,
        image: 'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/ton.png',
        name: 'Toncoin',
        symbol: 'TON',
        verification: 'whitelist'
    },
    outputAsset: {
        address: USDT,
        slug: 'USDT',
        decimals: 6,
        exchangeRate: '0',
        usdExchangeRate: 0,
        image: 'https://cache.tonapi.io/imgproxy/T3PB4s7oprNVaJkwqbGg54nexKE0zzKhcrPv8jcWYzU/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZXRoZXIudG8vaW1hZ2VzL2xvZ29DaXJjbGUucG5n.webp',
        name: 'Tether USD',
        symbol: 'USD₮',
        verification: 'whitelist'
    }
});
