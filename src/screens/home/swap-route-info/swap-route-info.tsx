import {FC, useContext, useMemo, useState} from 'react';

import {ExchangeInfo} from './exchange-info/exchange-info.tsx';
import {RouteInfo} from './route-info/route-info.tsx';
import {SwapRouteDisclaimer} from './swap-route-disclaimer/swap-route-disclaimer.tsx';
import styles from './swap-route-info.module.css';
import {ChevronDownIcon} from '../../../assets/icons/ChevronDownIcon/ChevronDownIcon.tsx';
import {ChevronUpIcon} from '../../../assets/icons/ChevronUpIcon/ChevronUpIcon.tsx';
import {SwapFormContext} from '../../../hooks/swap-form/swap-form.context.tsx';
import {useSwapRoutesSelector} from '../../../store/swap-routes/swap-routes-selectors.ts';
import {mapSwapRouteToRoute} from '../../../swap-routes/shared/calculated-swap-route.utils.ts';

export const SwapRouteInfo: FC = () => {
    const swapRoutes = useSwapRoutesSelector();
    const {inputAsset, inputAssetAmount, outputAsset} =
        useContext(SwapFormContext);
    const feePercantage = parseFloat(inputAssetAmount) * 0.001;
    const [showRoutes, setShowRoutes] = useState(true);
    const routes = useMemo(
        () => swapRoutes.map(mapSwapRouteToRoute),
        [swapRoutes]
    );

    const handleChevronClick = () => setShowRoutes(value => !value);

    return routes.length === 0 ? null : (
        <div className={styles.route_info_wrapper}>
            <ExchangeInfo
                inputAssetSymbol={inputAsset.symbol}
                outputAssetSymbol={outputAsset.symbol}
            />

            <div className={styles.route_info_div}>
                <div className={styles.route_info_inside_div}>
                    <p>Network fee</p>
                    <p>
                        {feePercantage} {inputAsset.symbol} ($?.??)
                    </p>
                </div>
                <div className={styles.route_info_inside_div}>
                    <p>{inputAsset.symbol} sell price</p>
                    <p>??? {inputAsset.symbol}</p>
                </div>
                <div className={styles.route_info_inside_div}>
                    <p>{outputAsset.symbol} sell price</p>
                    <p>??? {outputAsset.symbol}</p>
                </div>
                <div className={styles.route_info_inside_div}>
                    <p>Swap route</p>
                    <div onClick={handleChevronClick}>
                        <p>? chains/? dexes</p>
                        {showRoutes ? (
                            <ChevronUpIcon width="19px" height="19px" />
                        ) : (
                            <ChevronDownIcon width="19px" height="19px" />
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
            <SwapRouteDisclaimer />
        </div>
    );
};
