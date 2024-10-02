import {Asset} from 'rainbow-swap-sdk';
import {useMemo, useState} from 'react';

import {formatNumber} from '../../../utils/format-number.utils';

export const useExchangeRate = (
    inputAsset: Asset,
    outputAsset: Asset,
    exchangeRate: number
) => {
    const [isDirect, setIsDirect] = useState(true);

    return useMemo(() => {
        const firstSymbol = isDirect ? inputAsset.symbol : outputAsset.symbol;
        const secondSymbol = isDirect ? outputAsset.symbol : inputAsset.symbol;

        const adjustedExchangeRate = isDirect ? exchangeRate : 1 / exchangeRate;

        const text = `1 ${firstSymbol} = ${formatNumber(adjustedExchangeRate, 5)} ${secondSymbol}`;

        const usdValue = isDirect
            ? inputAsset.usdExchangeRate
            : outputAsset.usdExchangeRate;

        const usdText = `($${usdValue?.toFixed(2)})`;

        const toggleRate = () => setIsDirect(state => !state);

        return {text, usdText, toggleRate};
    }, [
        exchangeRate,
        inputAsset.symbol,
        inputAsset.usdExchangeRate,
        isDirect,
        outputAsset.symbol,
        outputAsset.usdExchangeRate
    ]);
};
