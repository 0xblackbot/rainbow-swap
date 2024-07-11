import {FC} from 'react';

import styles from './rate-info.module.css';
import {Asset} from '../../../interfaces/asset.interface';
import {RouteStepWithCalculation} from '../../../interfaces/route-step-with-calculation.interface';
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

const GUARANTEE_MESSAGE_LINK = 'https://t.me/rainbow_swap/19';

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
                href={GUARANTEE_MESSAGE_LINK}
                target="_blank"
            >
                <div className={styles.guarantee_text_container}>
                    <p className={styles.guarantee_text_1}>The Best</p>
                    <p className={styles.guarantee_text_2}>Price</p>
                    <p className={styles.guarantee_text_3}>Guarantee</p>
                </div>
            </a>
        </div>
    );
};
