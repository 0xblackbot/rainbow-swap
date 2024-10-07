import {Asset} from 'rainbow-swap-sdk';
import {useMemo, useState} from 'react';

import {useSwapDisplayDataSelector} from '../../../store/swap-routes/swap-routes-selectors';
import {formatNumber} from '../../../utils/format-number.utils';

export const useExchangeRate = (inputAsset: Asset, outputAsset: Asset) => {
    const [isDirect, setIsDirect] = useState(true);
    const swapDisplayData = useSwapDisplayDataSelector();

    return useMemo(() => {
        const firstSymbol = isDirect ? inputAsset.symbol : outputAsset.symbol;
        const secondSymbol = isDirect ? outputAsset.symbol : inputAsset.symbol;

        const adjustedExchangeRate = isDirect
            ? swapDisplayData.exchangeRate
            : swapDisplayData.exchangeRate === 0
              ? 0
              : 1 / swapDisplayData.exchangeRate;

        const text = `1 ${firstSymbol} = ${formatNumber(adjustedExchangeRate, 5)} ${secondSymbol}`;

        const usdValue = isDirect
            ? inputAsset.usdExchangeRate
            : outputAsset.usdExchangeRate;

        const usdText = `($${usdValue.toFixed(2)})`;

        const toggleRate = () => setIsDirect(state => !state);

        return {text, usdText, toggleRate};
    }, [
        inputAsset.symbol,
        inputAsset.usdExchangeRate,
        outputAsset.symbol,
        outputAsset.usdExchangeRate,
        isDirect,
        swapDisplayData.exchangeRate
    ]);
};
