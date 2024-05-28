import {Dispatch, SetStateAction, createContext} from 'react';

import {DEFAULT_ASSETS_RECORD} from '../../data/assets-record';
import {TON, USDT} from '../../globals';
import {Asset} from '../../interfaces/asset.interface';
import {EMPTY_FN} from '../../utils/emptyfn';

interface SwapFormContextValues {
    outputAsset: Asset;
    setOutputAsset: Dispatch<SetStateAction<Asset>>;
    inputAsset: Asset;
    setInputAsset: Dispatch<SetStateAction<Asset>>;
    inputAssetAmount: string;
    setInputAssetAmount: Dispatch<SetStateAction<string>>;
}

export const SwapFormContext = createContext<SwapFormContextValues>({
    outputAsset: DEFAULT_ASSETS_RECORD[USDT],
    setOutputAsset: EMPTY_FN,
    inputAsset: DEFAULT_ASSETS_RECORD[TON],
    setInputAsset: EMPTY_FN,
    inputAssetAmount: '',
    setInputAssetAmount: EMPTY_FN
});