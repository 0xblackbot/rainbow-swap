import {FC} from 'react';

import styles from './swap-details-header.module.css';
import {SwapDetailsHeaderProps} from './swap-details-header.props';
import {TooltipIcon} from '../../../../shared/tooltip/tooltip-icon';
import {useExchangeRate} from '../../hooks/use-exchange-rate.hook';

export const SwapDetailsHeader: FC<SwapDetailsHeaderProps> = ({
    inputAsset,
    outputAsset,
    routesLength
}) => {
    const exchangeRate = useExchangeRate(inputAsset, outputAsset);

    if (routesLength === 0) {
        return <p className={styles.error_text}>No routes available</p>;
    }

    if (inputAsset.address === outputAsset.address) {
        return (
            <div className={styles.attention_container}>
                <p className={styles.attention_text}>Arbitrage mode!</p>
                <TooltipIcon
                    text={
                        "Arbitrage is a high-risk swap. Many people and bots are attempting the same swap as you, creating a 'race' for profit, where only the first one to complete the swap will succeed."
                    }
                />
            </div>
        );
    }

    return (
        <p className={styles.rate_text} onClick={exchangeRate.toggleRate}>
            <span>{exchangeRate.text}</span>
            <span className={styles.usd_text}> {exchangeRate.usdText}</span>
        </p>
    );
};
