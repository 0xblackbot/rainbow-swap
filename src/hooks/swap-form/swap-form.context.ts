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
}

export const SwapFormContext = createContext<SwapFormContextValues>({
    outputAssetAddress: USDT,
    setOutputAssetAddress: EMPTY_FN,
    inputAssetAddress: TON,
    setInputAssetAddress: EMPTY_FN,
    inputAssetAmount: '',
    setInputAssetAmount: EMPTY_FN
});
