import {FC, Fragment, useMemo, useState} from 'react';

import {RouteInfo} from './route-info/route-info';
import {SwapDetailsHeader} from './swap-details-header/swap-details-header';
import {SwapDetailsHeaderProps} from './swap-details-header/swap-details-header.props';
import styles from './swap-details.module.css';
import {ChevronDownIcon} from '../../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {TooltipIcon} from '../../../shared/tooltip/tooltip-icon';
import {
    useIsRoutesLoadingSelector,
    useSwapDisplayDataSelector
} from '../../../store/swap-routes/swap-routes-selectors';
import {formatNumber} from '../../../utils/format-number.utils';
import {getSwapInputAssetAmount} from '../../../utils/route-step-with-calculation.utils';
import {getClassName} from '../../../utils/style.utils';
import {Skeleton} from '../../skeleton/skeleton';

interface Props extends SwapDetailsHeaderProps {
    isValidInputAssetAmount: boolean;
}

export const SwapDetails: FC<Props> = ({
    isValidInputAssetAmount,
    inputError,
    inputAsset,
    outputAsset,
    routes
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const isRoutesLoading = useIsRoutesLoadingSelector();
    const swapDisplayData = useSwapDisplayDataSelector();

    const nanoInputAssetAmount = getSwapInputAssetAmount(routes);

    const data = useMemo(() => {
        if (routes.length === 0) {
            return {
                maxSlippage: `-`,
                receiveAtLeast: `-`,
                receiveAtLeastTooltipText: undefined,
                routingFee: `-`,
                gasFee: `-`
            };
        }

        const receiveAtLeast = `${formatNumber(
            swapDisplayData.minOutputAssetAmount,
            5
        )} ${outputAsset.symbol}`;

        return {
            maxSlippage: `${swapDisplayData.maxSlippage.toFixed(2)}%`,
            receiveAtLeast: receiveAtLeast,
            receiveAtLeastTooltipText: `If the price drops below ${receiveAtLeast}, your transaction will be partially or fully reverted.`,
            routingFee: `${formatNumber(swapDisplayData.routingFeePercent, 2)}%`,
            gasFee: `~ ${formatNumber(swapDisplayData.roughGasFee, 2)} TON`
        };
    }, [
        routes.length,
        swapDisplayData.maxSlippage,
        swapDisplayData.minOutputAssetAmount,
        swapDisplayData.routingFeePercent,
        swapDisplayData.roughGasFee,
        outputAsset.symbol
    ]);

    const toggleAccordion = () => setIsOpen(value => !value);

    return (
        <div className={styles.container}>
            {isValidInputAssetAmount && (
                <>
                    <div className={styles.header_container}>
                        <Skeleton isLoading={isRoutesLoading}>
                            <SwapDetailsHeader
                                inputError={inputError}
                                inputAsset={inputAsset}
                                outputAsset={outputAsset}
                                routes={routes}
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
                                <p>{data.maxSlippage}</p>
                            </Skeleton>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.cell}>
                                <p>Receive at least</p>
                                <TooltipIcon
                                    text={data.receiveAtLeastTooltipText}
                                />
                            </div>
                            <Skeleton isLoading={isRoutesLoading}>
                                <p>{data.receiveAtLeast}</p>
                            </Skeleton>
                        </div>
                        <div className={styles.row}>
                            <p>Gas Fee</p>
                            <Skeleton isLoading={isRoutesLoading}>
                                <p>{data.gasFee}</p>
                            </Skeleton>
                        </div>
                        <div className={styles.row}>
                            <p>Routing Fee</p>
                            <Skeleton isLoading={isRoutesLoading}>
                                <p>{data.routingFee}</p>
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
                                            nanoInputAssetAmount
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
