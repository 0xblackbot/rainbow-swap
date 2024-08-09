import {Asset, RouteStepWithCalculation} from 'rainbow-swap-sdk';
import {FC} from 'react';

import styles from './rate-info.module.css';
import {useSlippageToleranceSelector} from '../../../store/settings/settings-selectors';
import {useIsRoutesLoadingSelector} from '../../../store/swap-routes/swap-routes-selectors';
import {formatNumber} from '../../../utils/format-number.utils';
import {EarnPoints} from '../earn-points/earn-points';
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
    const slippageTolerance = useSlippageToleranceSelector();

    const swapInfo = useSwapInfo(
        inputAsset.decimals,
        outputAsset.decimals,
        slippageTolerance,
        routes
    );

    return (
        <div className={styles.rate_div}>
            {inputAssetAmount.length !== 0 && !isRoutesLoading
                ? routes.length > 0
                    ? `1 ${inputAsset.symbol} = ${formatNumber(
                          swapInfo.exchangeRate,
                          5
                      )} ${outputAsset.symbol}`
                    : 'No routes available'
                : null}
            <EarnPoints />
        </div>
    );
};
