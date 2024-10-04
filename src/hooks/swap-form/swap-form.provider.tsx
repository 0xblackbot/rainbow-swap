import {FC, PropsWithChildren, useState} from 'react';
import {Helmet} from 'react-helmet';

import {SwapFormContext} from './swap-form.context';
import {TON, USDT} from '../../globals';
import {useAssetSelector} from '../../store/assets/assets-selectors';
import {useSyncSwapFormWithRouter} from '../use-set-assets-from-router-params.hook';

export const SwapFormProvider: FC<PropsWithChildren> = ({children}) => {
    const [inputAssetAddress, setInputAssetAddress] = useState<string>(TON);
    const [outputAssetAddress, setOutputAssetAddress] = useState<string>(USDT);
    const [inputAssetAmount, setInputAssetAmount] = useState('');

    const inputAsset = useAssetSelector(inputAssetAddress);
    const outputAsset = useAssetSelector(outputAssetAddress);

    useSyncSwapFormWithRouter(
        inputAsset,
        outputAsset,
        setInputAssetAddress,
        setOutputAssetAddress
    );

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
            <Helmet>
                <title>{`Swap ${inputAsset.symbol} to ${outputAsset.symbol} | Rainbow Swap`}</title>
                <meta
                    name="description"
                    content={`Swap ${inputAsset.symbol} to ${outputAsset.symbol} at best rates and minimal price impact.`}
                />
                <link
                    rel="canonical"
                    href={`https://rainbow.ag/${inputAsset.slug}/${outputAsset.slug}`}
                />
            </Helmet>
            {children}
        </SwapFormContext.Provider>
    );
};
