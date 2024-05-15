import {FC, PropsWithChildren, useState} from 'react';

import {SwapFormContext} from './swap-form.context';
import {DEFAULT_ASSETS_RECORD} from '../../data/assets-record';
import {TON, USDT} from '../../globals';
import {Asset} from '../../interfaces/asset.interface';

export const SwapFormProvider: FC<PropsWithChildren> = ({children}) => {
    const [inputAsset, setInputAsset] = useState<Asset>(
        DEFAULT_ASSETS_RECORD[TON]
    );
    const [outputAsset, setOutputAsset] = useState<Asset>(
        DEFAULT_ASSETS_RECORD[USDT]
    );
    const [inputAssetAmount, setInputAssetAmount] = useState('');
    const [outputAssetAmount, setOutputAssetAmount] = useState('');
    return (
        <SwapFormContext.Provider
            value={{
                inputAsset,
                outputAsset,
                inputAssetAmount,
                outputAssetAmount,
                setInputAsset,
                setOutputAsset,
                setInputAssetAmount,
                setOutputAssetAmount
            }}
        >
            {children}
        </SwapFormContext.Provider>
    );
};
