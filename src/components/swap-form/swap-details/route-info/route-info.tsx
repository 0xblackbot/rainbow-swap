import {RouteStepWithCalculation} from 'rainbow-swap-sdk';
import {FC, Fragment} from 'react';

import styles from './route-info.module.css';
import {SwapRouteStep} from './swap-route-step/swap-route-step';
import {getRouteInputAssetAmount} from '../../../../utils/route-step-with-calculation.utils';

interface Props {
    nanoInputAssetAmount: bigint;
    route: RouteStepWithCalculation[];
}

export const RouteInfo: FC<Props> = ({nanoInputAssetAmount, route}) => {
    const routeStep_nanoInputAssetAmount = getRouteInputAssetAmount(route);

    const routeInputAssetPercentage = (
        (Number(routeStep_nanoInputAssetAmount) /
            Number(nanoInputAssetAmount)) *
        100
    ).toFixed(2);

    return (
        <div className={styles.route}>
            <div className={styles.route_info}>
                <p>{routeInputAssetPercentage + '%'}</p>
            </div>
            {route.map((routeStep, index) => (
                <Fragment key={`route-step-${index}`}>
                    {index === 0 ? <div className={styles.dots}></div> : null}
                    <SwapRouteStep routeStep={routeStep} />
                    <div className={styles.dots}></div>
                </Fragment>
            ))}
            <div className={styles.route_info}>
                <p>{routeInputAssetPercentage + '%'}</p>
            </div>
        </div>
    );
};
