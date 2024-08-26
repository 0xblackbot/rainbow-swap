import {Asset} from 'rainbow-swap-sdk';
import {Dispatch, SetStateAction, createContext} from 'react';

import {TON, USDT} from '../../globals';
import {EMPTY_FN} from '../../utils/emptyfn';

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
    setOutputAssetAddress: EMPTY_FN,
    inputAssetAddress: TON,
    setInputAssetAddress: EMPTY_FN,
    inputAssetAmount: '',
    setInputAssetAmount: EMPTY_FN,
    inputAsset: {
        address: TON,
        decimals: 9,
        exchangeRate: '0',
        image: 'https://assets.dedust.io/images/ton.webp',
        name: 'Toncoin',
        symbol: 'TON',
        verification: 'whitelist'
    },
    outputAsset: {
        address: USDT,
        decimals: 6,
        exchangeRate: '0',
        image: 'https://cache.tonapi.io/imgproxy/T3PB4s7oprNVaJkwqbGg54nexKE0zzKhcrPv8jcWYzU/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZXRoZXIudG8vaW1hZ2VzL2xvZ29DaXJjbGUucG5n.webp',
        name: 'Tether USD',
        symbol: 'USD₮',
        verification: 'whitelist'
    }
});
