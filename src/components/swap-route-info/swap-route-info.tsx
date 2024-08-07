import {mapSwapRouteToRoute} from 'rainbow-swap-sdk';
import {FC, Fragment, useMemo} from 'react';

import {RouteInfo} from './route-info/route-info';
import styles from './swap-route-info.module.css';
import {SwapIcon} from '../../assets/icons/SwapIcon/SwapIcon';
import {useSwapForm} from '../../hooks/swap-form/swap-form.hook';
import {useAssetsRecordSelector} from '../../store/assets/assets-selectors';
import {useSlippageToleranceSelector} from '../../store/settings/settings-selectors';
import {useSwapRoutesSelector} from '../../store/swap-routes/swap-routes-selectors';
import {formatNumber} from '../../utils/format-number.utils';
import {getClassName} from '../../utils/style.utils';
import {useSwapInfo} from '../swap-form/hooks/use-swap-info.hook';

export const SwapRouteInfo: FC = () => {
    const swapRoutes = useSwapRoutesSelector();
    const assets = useAssetsRecordSelector();
    const slippageTolerance = useSlippageToleranceSelector();

    const {inputAssetAddress, outputAssetAddress} = useSwapForm();

    const routes = useMemo(
        () => swapRoutes.data.map(mapSwapRouteToRoute),
        [swapRoutes.data]
    );

    const inputAsset = assets[inputAssetAddress];
    const outputAsset = assets[outputAssetAddress];

    const swapInfo = useSwapInfo(
        inputAsset.decimals,
        outputAsset.decimals,
        slippageTolerance,
        routes
    );

    return (
        <div className={styles.route_info_wrapper}>
            <div
                className={getClassName(
                    styles.loader_overlay,
                    swapRoutes.isLoading ? styles.show : ''
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
                    <p>
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
                    <p>
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
                <p>
                    {`1 ${inputAsset.symbol} = ${formatNumber(swapInfo.exchangeRate, 5)} ${outputAsset.symbol}`}
                </p>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>Fee</p>
                <p>0%</p>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>Max. slippage</p>
                <p>{slippageTolerance}%</p>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>Receive at least</p>
                <p>{`${swapInfo.minOutputAssetAmount} ${outputAsset.symbol}`}</p>
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
