import {Asset, RouteStepWithCalculation} from 'rainbow-swap-sdk';
import {FC, Fragment, useState} from 'react';

import {RouteInfo} from './route-info/route-info';
import styles from './swap-details.module.css';
import {ChevronDownIcon} from '../../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {SwapInfo} from '../../../interfaces/swap-info.interface';
import {useMaxSlippageSelector} from '../../../store/settings/settings-selectors';
import {useIsRoutesLoadingSelector} from '../../../store/swap-routes/swap-routes-selectors';
import {formatNumber} from '../../../utils/format-number.utils';
import {getClassName} from '../../../utils/style.utils';
import {Skeleton} from '../../skeleton/skeleton';
import {useExchangeRate} from '../hooks/use-exchange-rate.hook';
import {useRoutingFee} from '../hooks/use-routing-fee.hook';

interface Props {
    swapInfo: SwapInfo;
    inputAsset: Asset;
    outputAsset: Asset;
    inputAssetAmount: string;
    routes: RouteStepWithCalculation[][];
}

export const SwapDetails: FC<Props> = ({
    swapInfo,
    inputAsset,
    outputAsset,
    inputAssetAmount,
    routes
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const isRoutesLoading = useIsRoutesLoadingSelector();
    const slippageTolerance = useMaxSlippageSelector();

    const exchangeRate = useExchangeRate(
        inputAsset,
        outputAsset,
        swapInfo.exchangeRate
    );

    const routingFee = useRoutingFee(routes);

    const toggleAccordion = () => setIsOpen(value => !value);

    return (
        <div className={styles.container}>
            {inputAssetAmount !== '' && (
                <>
                    <div className={styles.header_container}>
                        {inputAsset.address === outputAsset.address ? (
                            <p className={styles.attention_text}>
                                Arbitrage mode!
                            </p>
                        ) : (
                            <Skeleton isLoading={isRoutesLoading}>
                                {routes.length === 0 ? (
                                    <p>No routes available</p>
                                ) : (
                                    <p
                                        className={styles.rate_text}
                                        onClick={exchangeRate.toggleRate}
                                    >
                                        <span>{exchangeRate.text}</span>
                                        <span className={styles.usd_text}>
                                            {' '}
                                            {exchangeRate.usdText}
                                        </span>
                                    </p>
                                )}
                            </Skeleton>
                        )}
                        <div
                            className={styles.toggle_button}
                            onClick={toggleAccordion}
                        >
                            <ChevronDownIcon
                                className={getClassName(
                                    styles.chevron,
                                    isOpen ? styles.chevron_open : ''
                                )}
                            />
                        </div>
                    </div>

                    <div
                        className={getClassName(
                            styles.info_container,
                            isOpen ? styles.info_container_open : ''
                        )}
                    >
                        <div className={styles.info_container_ident} />
                        <div className={styles.row}>
                            <p>Max slippage</p>
                            <Skeleton isLoading={isRoutesLoading}>
                                <p>{slippageTolerance}%</p>
                            </Skeleton>
                        </div>
                        <div className={styles.row}>
                            <p>Receive at least</p>
                            <Skeleton isLoading={isRoutesLoading}>
                                <p>{`${formatNumber(swapInfo.minOutputAssetAmount, 5)} ${outputAsset.symbol}`}</p>
                            </Skeleton>
                        </div>
                        <div className={styles.row}>
                            <p>Routing Fee</p>
                            <Skeleton isLoading={isRoutesLoading}>
                                <p>{routingFee}%</p>
                            </Skeleton>
                        </div>
                        <div className={styles.row}>
                            <p>Swap route</p>
                        </div>
                        <div className={styles.routes_container}>
                            {routes.map((route, index) => (
                                <Fragment key={`route-${index}`}>
                                    <RouteInfo
                                        nanoInputAssetAmount={
                                            swapInfo.nanoInputAssetAmount
                                        }
                                        route={route}
                                    />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
