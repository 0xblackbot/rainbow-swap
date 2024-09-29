import {useMemo, useState} from 'react';

import {formatNumber} from '../../../utils/format-number.utils';

export const useExchangeRate = (
    inputAssetSymbol: string,
    outputAssetSymbol: string,
    exchangeRate: number
) => {
    const [isDirect, setIsDirect] = useState(true);

    return useMemo(() => {
        const firstSymbol = isDirect ? inputAssetSymbol : outputAssetSymbol;
        const secondSymbol = isDirect ? outputAssetSymbol : inputAssetSymbol;

        const adjustedExchangeRate = isDirect ? exchangeRate : 1 / exchangeRate;

        const text = `1 ${firstSymbol} = ${formatNumber(adjustedExchangeRate, 5)} ${secondSymbol}`;
        const toggleRate = () => setIsDirect(state => !state);

        return {text, toggleRate};
    }, [exchangeRate, inputAssetSymbol, isDirect, outputAssetSymbol]);
};
