import {Asset, RouteStepWithCalculation} from 'rainbow-swap-sdk';
import {FC} from 'react';

import styles from './rate-info.module.css';
import {useSlippageToleranceSelector} from '../../../store/settings/settings-selectors';
import {formatNumber} from '../../../utils/format-number.utils';
import {useSwapInfo} from '../hooks/use-swap-info.hook';

interface Props {
    inputAsset: Asset;
    outputAsset: Asset;
    inputAssetAmount: string;
    routes: RouteStepWithCalculation[][];
    isLoading: boolean;
}

const CHANNEL_LINK = 'https://t.me/rainbow_swap';

export const RateInfo: FC<Props> = ({
    inputAsset,
    outputAsset,
    inputAssetAmount,
    routes,
    isLoading
}) => {
    const slippageTolerance = useSlippageToleranceSelector();

    const swapInfo = useSwapInfo(
        inputAsset.decimals,
        outputAsset.decimals,
        slippageTolerance,
        routes
    );

    return (
        <div className={styles.rate_div}>
            {inputAssetAmount.length !== 0 && !isLoading
                ? routes.length > 0
                    ? `1 ${inputAsset.symbol} = ${formatNumber(
                          swapInfo.exchangeRate,
                          5
                      )} ${outputAsset.symbol}`
                    : 'No routes available'
                : null}
            <a
                className={styles.guarantee_container}
                href={CHANNEL_LINK}
                target="_blank"
            >
                <div className={styles.guarantee_text_container}>
                    <p className={styles.guarantee_text_1}>Tap-tap</p>
                    <p className={styles.guarantee_text_2}>SOON</p>
                    <p className={styles.guarantee_text_1}>Tap-tap</p>
                </div>
            </a>
        </div>
    );
};
