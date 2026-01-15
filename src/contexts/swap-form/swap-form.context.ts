import {emptyFn} from '@rnw-community/shared';
import {Asset} from 'rainbow-swap-sdk';
import {Dispatch, SetStateAction, createContext} from 'react';

import {DEFAULT_ASSETS_RECORD} from '../../data/assets-record';
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
    inputAsset: DEFAULT_ASSETS_RECORD[TON],
    outputAsset: DEFAULT_ASSETS_RECORD[USDT]
});
