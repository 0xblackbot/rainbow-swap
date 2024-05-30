import {FC, Fragment, useMemo} from 'react';

import {RouteInfo} from './route-info/route-info.tsx';
import styles from './swap-route-info.module.css';
import {SwapIcon} from '../../../assets/icons/SwapIcon/SwapIcon.tsx';
import {useSwapForm} from '../../../hooks/swap-form/swap-form.hook.ts';
import {useAssetsRecordSelector} from '../../../store/assets/assets-selectors.ts';
import {useSwapRoutesSelector} from '../../../store/swap-routes/swap-routes-selectors.ts';
import {mapSwapRouteToRoute} from '../../../swap-routes/shared/calculated-swap-route.utils.ts';
import {formatNumber} from '../../../utils/format-number.utils.ts';
import {getRoutesStepCount} from '../../../utils/route-step-with-calculation.utils.ts';
import {getClassName} from '../../../utils/style.utils.ts';
import {useOutputAssetAmount} from '../swap-form/hooks/use-output-asset-amount.hook.ts';

export const SwapRouteInfo: FC = () => {
    const swapRoutes = useSwapRoutesSelector();
    const assets = useAssetsRecordSelector();
    const {inputAsset, outputAsset, inputAssetAmount} = useSwapForm();
    const routes = useMemo(
        () => swapRoutes.data.map(mapSwapRouteToRoute),
        [swapRoutes.data]
    );
    const outputAssetAmount = useOutputAssetAmount(
        routes,
        outputAsset.decimals
    );
    const {chainsAmount, poolsAmount} = useMemo(
        () => getRoutesStepCount(routes),
        [routes]
    );
    const exchangeRate =
        parseFloat(assets[inputAsset.address].exchangeRate) /
        parseFloat(assets[outputAsset.address].exchangeRate);

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
            <div className={styles.route_info_inside_div}>
                <p>You send</p>
                <p>
                    {inputAssetAmount} {inputAsset.symbol}
                </p>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>You receive</p>
                <p>
                    {outputAssetAmount} {outputAsset.symbol}
                </p>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>Exchange rate</p>
                <p>
                    1 {inputAsset.symbol} = {formatNumber(exchangeRate, 5)}{' '}
                    {outputAsset.symbol}
                </p>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>Routing fee</p>
                <p>
                    0% <span className={styles.crossed_out}>0.1%</span>
                </p>
            </div>
            <div className={styles.route_info_inside_div}>
                <p>Swap route</p>
                <p>
                    {chainsAmount} chains/{poolsAmount} pools
                </p>
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
