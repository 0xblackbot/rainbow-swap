import {isDefined} from '@rnw-community/shared';
import {FC} from 'react';

import styles from './swap-details-header.module.css';
import {SwapDetailsHeaderProps} from './swap-details-header.props';
import {useExchangeRate} from '../../hooks/use-exchange-rate.hook';

export const SwapDetailsHeader: FC<SwapDetailsHeaderProps> = ({
    inputError,
    inputAsset,
    outputAsset,
    routes,
    swapInfo
}) => {
    const exchangeRate = useExchangeRate(
        inputAsset,
        outputAsset,
        swapInfo.exchangeRate
    );

    if (isDefined(inputError)) {
        return <p className={styles.error_text}>{inputError}</p>;
    }

    if (inputAsset.address === outputAsset.address) {
        return <p className={styles.attention_text}>Arbitrage mode!</p>;
    }

    if (routes.length === 0) {
        return <p>No routes available</p>;
    }

    return (
        <p className={styles.rate_text} onClick={exchangeRate.toggleRate}>
            <span>{exchangeRate.text}</span>
            <span className={styles.usd_text}> {exchangeRate.usdText}</span>
        </p>
    );
};
