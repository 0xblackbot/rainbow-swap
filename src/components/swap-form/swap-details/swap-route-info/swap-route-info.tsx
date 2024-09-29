import {FC, Fragment} from 'react';

import styles from './swap-route-info.module.css';
import {SwapIcon} from '../../../../assets/icons/SwapIcon/SwapIcon';
import {useSwapForm} from '../../../../hooks/swap-form/swap-form.hook';
import {SwapInfo} from '../../../../interfaces/swap-info.interface';
import {useMaxSlippageSelector} from '../../../../store/settings/settings-selectors';
import {
    useIsRoutesLoadingSelector,
    useRoutesSelector
} from '../../../../store/swap-routes/swap-routes-selectors';
import {formatNumber} from '../../../../utils/format-number.utils';
import {getClassName} from '../../../../utils/style.utils';
import {useExchangeRate} from '../../hooks/use-exchange-rate.hook';
import {RouteInfo} from '../route-info/route-info';

interface Props {
    swapInfo: SwapInfo;
}

export const SwapRouteInfo: FC<Props> = ({swapInfo}) => {
    const routes = useRoutesSelector();
    const isRoutesLoading = useIsRoutesLoadingSelector();
    const slippageTolerance = useMaxSlippageSelector();

    const {inputAsset, outputAsset} = useSwapForm();
    const exchangeRate = useExchangeRate(
        inputAsset.symbol,
        outputAsset.symbol,
        swapInfo.exchangeRate
    );

    return (
        <div className={styles.route_info_wrapper}>
            <div
                className={getClassName(
                    styles.loader_overlay,
                    isRoutesLoading ? styles.show : ''
                )}
            >
                <div className={styles.loader_spinner}></div>
            </div>
            <div className={styles.route_info_header}>
                <SwapIcon className={styles.route_info_header_logo} />
                <p className={styles.route_info_header_text}>Route info</p>
            </div>
            <div
                className={getClassName(
                    styles.route_info_inside_div,
                    styles.route_info_inside_div_big
                )}
            >
                <p>You send</p>
                <div>
                    <p className={styles.value_text}>
                        {swapInfo.inputAssetAmount} {inputAsset.symbol}
                    </p>
                    <img
                        className={styles.asset_image}
                        src={inputAsset.image}
                    />
                </div>
            </div>
            <div
                className={getClassName(
                    styles.route_info_inside_div,
                    styles.route_info_inside_div_big
                )}
            >
                <p>You receive</p>
                <div>
                    <p className={styles.value_text}>
                        {swapInfo.outputAssetAmount} {outputAsset.symbol}
                    </p>
                    <img
                        className={styles.asset_image}
                        src={outputAsset.image}
                    />
                </div>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>Rate</p>
                <p
                    className={getClassName(
                        styles.value_text,
                        styles.rate_text
                    )}
                    onClick={exchangeRate.toggleRate}
                >
                    {exchangeRate.text}
                </p>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>Routing Fee</p>
                <p className={styles.value_text}>
                    <span className={styles.crossed_out}>0.1%</span>
                    <span className={styles.fee_text}> 0%</span>
                </p>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>Max slippage</p>
                <p className={styles.value_text}>{slippageTolerance}%</p>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>Receive at least</p>
                <p
                    className={styles.value_text}
                >{`${formatNumber(swapInfo.minOutputAssetAmount, 5)} ${outputAsset.symbol}`}</p>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>Swap route</p>
            </div>
            <div className={styles.routes_container}>
                {routes.map((route, index) => (
                    <Fragment key={`route-${index}`}>
                        <RouteInfo route={route} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
