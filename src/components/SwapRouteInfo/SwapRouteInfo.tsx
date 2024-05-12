import {FC, useMemo, useState} from 'react';

import {ExchangeInfo} from './ExchangeInfo/ExchangeInfo';
import {ChevronDownIcon} from '../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {ChevronUpIcon} from '../../assets/icons/ChevronUpIcon/ChevronUpIcon';
import {useAssetsRecordSelector} from '../../store/assets/assets-selectors.ts';
import {CalculatedSwapRoute} from '../../swap-routes/shared/calculated-swap-route.type.ts';
import {mapSwapRouteToRoute} from '../../swap-routes/shared/calculated-swap-route.utils.ts';
import styles from '../Body/Body.module.css';

interface Props {
    swapRoutes: CalculatedSwapRoute[];
}

export const SwapRouteInfo: FC<Props> = ({swapRoutes}) => {
    const [showRoutes, setShowRoutes] = useState(false);
    const routes = useMemo(
        () => swapRoutes.map(mapSwapRouteToRoute),
        [swapRoutes]
    );
    const assetsRecord = useAssetsRecordSelector();

    const {inputAssetSymbol, outputAssetSymbol} = useMemo(() => {
        const inputAssetAddress = routes[0]?.[0]?.inputAssetAddress;
        const outputAssetAddress = routes[0]?.[0]?.outputAssetAddress;

        const inputAsset = assetsRecord[inputAssetAddress];
        const outputAsset = assetsRecord[outputAssetAddress];

        return {
            inputAssetSymbol: inputAsset?.symbol ?? 'input_asset_not_found',
            outputAssetSymbol: outputAsset?.symbol ?? 'output_asset_not_found'
        };
    }, [routes, assetsRecord]);

    const handleChevronClick = () => setShowRoutes(value => !value);

    return routes.length === 0 ? null : (
        <>
            <ExchangeInfo
                inputAssetSymbol={inputAssetSymbol}
                outputAssetSymbol={outputAssetSymbol}
            />

            <div className={styles.route_info_div}>
                <div className={styles.route_info_inside_div}>
                    <p>{inputAssetSymbol} sell price</p>
                    <p>??? {inputAssetSymbol}</p>
                </div>
                <div className={styles.route_info_inside_div}>
                    <p>{outputAssetSymbol} sell price</p>
                    <p>??? {outputAssetSymbol}</p>
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
                    <div>
                        {routes.map((route, index) => (
                            <div key={`route-${index}`}>
                                {route.map(routeStep => (
                                    <p key={routeStep.dexPairAddress}>
                                        {routeStep.inputAssetAddress} {'>'}
                                        {routeStep.outputAssetAddress}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
