import {FC, Fragment, useState} from 'react';

import {RouteInfo} from './route-info/route-info';
import {SwapDetailsHeader} from './swap-details-header/swap-details-header';
import {SwapDetailsHeaderProps} from './swap-details-header/swap-details-header.props';
import styles from './swap-details.module.css';
import {ChevronDownIcon} from '../../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {useMaxSlippageSelector} from '../../../store/settings/settings-selectors';
import {
    useIsRoutesLoadingSelector,
    useRoutingFeeSelector
} from '../../../store/swap-routes/swap-routes-selectors';
import {formatNumber} from '../../../utils/format-number.utils';
import {getClassName} from '../../../utils/style.utils';
import {Skeleton} from '../../skeleton/skeleton';

interface Props extends SwapDetailsHeaderProps {
    inputAssetAmount: string;
}

export const SwapDetails: FC<Props> = ({
    inputAssetAmount,
    inputError,
    inputAsset,
    outputAsset,
    routes,
    swapInfo
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const isRoutesLoading = useIsRoutesLoadingSelector();
    const slippageTolerance = useMaxSlippageSelector();
    const routingFee = useRoutingFeeSelector();

    const toggleAccordion = () => setIsOpen(value => !value);

    return (
        <div className={styles.container}>
            {inputAssetAmount !== '' && (
                <>
                    <div className={styles.header_container}>
                        <Skeleton isLoading={isRoutesLoading}>
                            <SwapDetailsHeader
                                inputError={inputError}
                                inputAsset={inputAsset}
                                outputAsset={outputAsset}
                                routes={routes}
                                swapInfo={swapInfo}
                            />
                        </Skeleton>
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
