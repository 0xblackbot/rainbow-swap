import {RouteDisplayData} from 'rainbow-swap-sdk';
import {FC, Fragment} from 'react';

import styles from './route-info.module.css';
import {SwapRouteStep} from './swap-route-step/swap-route-step';

interface Props {
    route: RouteDisplayData;
}

export const RouteInfo: FC<Props> = ({route}) => {
    const inputPercent = route.inputPercent.toFixed(2);

    return (
        <div className={styles.route}>
            <div className={styles.route_info}>
                <p>{inputPercent + '%'}</p>
            </div>
            {route.routeSteps.map((routeStep, index) => (
                <Fragment key={`route-step-${index}`}>
                    {index === 0 ? <div className={styles.dots}></div> : null}
                    <SwapRouteStep routeStep={routeStep} />
                    <div className={styles.dots}></div>
                </Fragment>
            ))}
            <div className={styles.route_info}>
                <p>{inputPercent + '%'}</p>
            </div>
        </div>
    );
};
