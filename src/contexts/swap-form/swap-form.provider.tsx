import {FC, PropsWithChildren, useLayoutEffect, useState} from 'react';

import {SwapFormContext} from './swap-form.context';
import {TON, USDT} from '../../globals';
import {useSyncSwapFormWithRouter} from '../../hooks/use-set-assets-from-router-params.hook';
import {useAssetSelector} from '../../store/assets/assets-selectors';

export const SwapFormProvider: FC<PropsWithChildren> = ({children}) => {
    const [inputAssetAddress, setInputAssetAddress] = useState<string>(TON);
    const [outputAssetAddress, setOutputAssetAddress] = useState<string>(USDT);
    const [inputAssetAmount, setInputAssetAmount] = useState('');

    const inputAsset = useAssetSelector(inputAssetAddress);
    const outputAsset = useAssetSelector(outputAssetAddress);

    useLayoutEffect(() => {
        // Keep the HTML fallback until React takes ownership of page metadata.
        const fallbackMetadata = Array.from(
            document.head.querySelectorAll('[data-app-metadata-fallback]')
        );
        fallbackMetadata.forEach(element => element.remove());

        return () => {
            document.head.append(...fallbackMetadata);
        };
    }, []);

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
            <title>{`Swap ${inputAsset.symbol} to ${outputAsset.symbol} | Rainbow Swap`}</title>
            <meta
                name="description"
                content={`Swap ${inputAsset.symbol} to ${outputAsset.symbol} at best rates and minimal price impact.`}
            />
            <link
                rel="canonical"
                href={`https://rainbow.ag/${inputAsset.slug}/${outputAsset.slug}`}
            />
            {children}
        </SwapFormContext.Provider>
    );
};
