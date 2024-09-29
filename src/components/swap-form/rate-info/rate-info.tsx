import {Asset, RouteStepWithCalculation} from 'rainbow-swap-sdk';
import {FC} from 'react';

import styles from './rate-info.module.css';
import {useMaxSlippageSelector} from '../../../store/settings/settings-selectors';
import {useIsRoutesLoadingSelector} from '../../../store/swap-routes/swap-routes-selectors';
import {useExchangeRate} from '../hooks/use-exchange-rate.hook';
import {useSwapInfo} from '../hooks/use-swap-info.hook';

interface Props {
    inputAsset: Asset;
    outputAsset: Asset;
    inputAssetAmount: string;
    routes: RouteStepWithCalculation[][];
}

export const RateInfo: FC<Props> = ({
    inputAsset,
    outputAsset,
    inputAssetAmount,
    routes
}) => {
    const isRoutesLoading = useIsRoutesLoadingSelector();
    const slippageTolerance = useMaxSlippageSelector();

    const swapInfo = useSwapInfo(
        inputAsset.decimals,
        outputAsset.decimals,
        slippageTolerance,
        routes
    );
    const exchangeRate = useExchangeRate(
        inputAsset.symbol,
        outputAsset.symbol,
        swapInfo.exchangeRate
    );

    return (
        <div className={styles.rate_div}>
            {inputAsset.address === outputAsset.address ? (
                <p className={styles.attention_text}>Arbitrage mode!</p>
            ) : inputAssetAmount.length !== 0 && !isRoutesLoading ? (
                routes.length > 0 ? (
                    <p
                        className={styles.rate_text}
                        onClick={exchangeRate.toggleRate}
                    >
                        {exchangeRate.text}
                    </p>
                ) : (
                    <p>No routes available</p>
                )
            ) : null}
        </div>
    );
};
