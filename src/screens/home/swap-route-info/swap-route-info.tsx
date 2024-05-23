import {FC, useContext, useMemo, useState} from 'react';

import {RouteInfo} from './route-info/route-info.tsx';
import styles from './swap-route-info.module.css';
import {ChevronDownIcon} from '../../../assets/icons/ChevronDownIcon/ChevronDownIcon.tsx';
import {ChevronUpIcon} from '../../../assets/icons/ChevronUpIcon/ChevronUpIcon.tsx';
import {SwapFormContext} from '../../../hooks/swap-form/swap-form.context.tsx';
import {useAssetsRecordSelector} from '../../../store/assets/assets-selectors.ts';
import {useSwapRoutesSelector} from '../../../store/swap-routes/swap-routes-selectors.ts';
import {mapSwapRouteToRoute} from '../../../swap-routes/shared/calculated-swap-route.utils.ts';
import {formatNumber} from '../../../utils/format-number.utils.ts';
import {getRoutesStepCount} from '../../../utils/route-step-with-calculation.utils.ts';

export const SwapRouteInfo: FC = () => {
    const swapRoutes = useSwapRoutesSelector();
    const assets = useAssetsRecordSelector();
    const {inputAsset, outputAsset} = useContext(SwapFormContext);
    const [showRoutes, setShowRoutes] = useState(true);
    const routes = useMemo(
        () => swapRoutes.map(mapSwapRouteToRoute),
        [swapRoutes]
    );
    const {chainsAmount, poolsAmount} = useMemo(
        () => getRoutesStepCount(routes),
        [routes]
    );
    const exchangeRate =
        parseFloat(assets[inputAsset.address].exchangeRate) /
        parseFloat(assets[outputAsset.address].exchangeRate);

    const handleChevronClick = () => setShowRoutes(value => !value);

    return routes.length === 0 ? null : (
        <div className={styles.route_info_wrapper}>
            <div className={styles.route_info_div}>
                <div className={styles.route_info_inside_div}>
                    <p>Routing fee</p>
                    <p>
                        0% <span className={styles.crossed_out}>0.1%</span>
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
                    <p>Swap route</p>
                    <div
                        className={styles.show_routes_div}
                        onClick={handleChevronClick}
                    >
                        <p>
                            {chainsAmount} chains/{poolsAmount} pools
                        </p>
                        {showRoutes ? (
                            <ChevronUpIcon
                                className={styles.show_routes_chevron}
                                width="19px"
                                height="19px"
                            />
                        ) : (
                            <ChevronDownIcon
                                className={styles.show_routes_chevron}
                                width="19px"
                                height="19px"
                            />
                        )}
                    </div>
                </div>
                {showRoutes && (
                    <div className={styles.routes_container}>
                        {routes.map((route, index) => (
                            <RouteInfo index={index} route={route} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
