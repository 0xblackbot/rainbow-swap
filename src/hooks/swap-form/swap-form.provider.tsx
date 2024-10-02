import {FC, PropsWithChildren, useState} from 'react';

import {SwapFormContext} from './swap-form.context';
import {TON, USDT} from '../../globals';
import {useAssetSelector} from '../../store/assets/assets-selectors';
import {useSetAssetsFromRouterParams} from '../use-set-assets-from-router-params.hook';

export const SwapFormProvider: FC<PropsWithChildren> = ({children}) => {
    const [inputAssetAddress, setInputAssetAddress] = useState<string>(TON);
    const [outputAssetAddress, setOutputAssetAddress] = useState<string>(USDT);
    const [inputAssetAmount, setInputAssetAmount] = useState('');

    const inputAsset = useAssetSelector(inputAssetAddress);
    const outputAsset = useAssetSelector(outputAssetAddress);

    useSetAssetsFromRouterParams(setInputAssetAddress, setOutputAssetAddress);

    return (
        <SwapFormContext.Provider
            value={{
                inputAssetAddress,
                outputAssetAddress,
                inputAssetAmount,

                setInputAssetAddress,
                setOutputAssetAddress,
                setInputAssetAmount,

                inputAsset,
                outputAsset
            }}
        >
            {children}
        </SwapFormContext.Provider>
    );
};
