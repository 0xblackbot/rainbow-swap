import {FC, useContext, useMemo, useState} from 'react';

import {ExchangeInfo} from './exchange-info/exchange-info.tsx';
import styles from './swap-route-info.module.css';
import {ChevronDownIcon} from '../../../assets/icons/ChevronDownIcon/ChevronDownIcon.tsx';
import {ChevronUpIcon} from '../../../assets/icons/ChevronUpIcon/ChevronUpIcon.tsx';
import {SwapFormContext} from '../../../hooks/swap-form/swap-form.context.tsx';
import {useSwapRoutesSelector} from '../../../store/swap-routes/swap-routes-selectors.ts';
import {mapSwapRouteToRoute} from '../../../swap-routes/shared/calculated-swap-route.utils.ts';
import {SwapRouteStep} from '../swap-route-step/swap-route-step.tsx';

export const SwapRouteInfo: FC = () => {
    const swapRoutes = useSwapRoutesSelector();
    const {inputAsset, outputAsset} = useContext(SwapFormContext);

    const [showRoutes, setShowRoutes] = useState(false);
    const routes = useMemo(
        () => swapRoutes.map(mapSwapRouteToRoute),
        [swapRoutes]
    );

    const handleChevronClick = () => setShowRoutes(value => !value);

    return routes.length === 0 ? null : (
        <>
            <ExchangeInfo
                inputAssetSymbol={inputAsset.symbol}
                outputAssetSymbol={outputAsset.symbol}
            />

            <div className={styles.route_info_div}>
                <div className={styles.route_info_inside_div}>
                    <p>{inputAsset.symbol} sell price</p>
                    <p>??? {inputAsset.symbol}</p>
                </div>
                <div className={styles.route_info_inside_div}>
                    <p>{outputAsset.symbol} sell price</p>
                    <p>??? {outputAsset.symbol}</p>
                </div>
                <div className={styles.route_info_inside_div}>
                    <p>Network fee</p>
                    <p>??? TON ($?.??)</p>
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
                            <div
                                key={`route-${index}`}
                                className={styles.route}
                            >
                                {route.map((routeStep, index) => (
                                    <>
                                        {index === 0 ? (
                                            <div className={styles.dots}></div>
                                        ) : null}
                                        <SwapRouteStep routeStep={routeStep} />
                                        <div className={styles.dots}></div>
                                    </>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
