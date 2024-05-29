import {FC, PropsWithChildren, useState} from 'react';

import {SwapFormContext} from './swap-form.context.ts';
import {DEFAULT_ASSETS_RECORD} from '../../data/assets-record.ts';
import {TON, USDT} from '../../globals';
import {Asset} from '../../interfaces/asset.interface.ts';

export const SwapFormProvider: FC<PropsWithChildren> = ({children}) => {
    const [inputAssetAddress, setInputAssetAddress] = useState<Asset>(
        DEFAULT_ASSETS_RECORD[TON]
    );
    const [outputAssetAddress, setOutputAssetAddress] = useState<Asset>(
        DEFAULT_ASSETS_RECORD[USDT]
    );
    const [inputAssetAmount, setInputAssetAmount] = useState('');

    return (
        <SwapFormContext.Provider
            value={{
                inputAssetAddress: inputAssetAddress.address,
                outputAssetAddress: outputAssetAddress.address,
                inputAssetAmount,

                setInputAssetAddress,
                setOutputAssetAddress,
                setInputAssetAmount
            }}
        >
            {children}
        </SwapFormContext.Provider>
    );
};
