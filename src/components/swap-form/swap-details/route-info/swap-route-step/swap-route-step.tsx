import {RouteStepDisplayData} from 'rainbow-swap-sdk';
import {FC} from 'react';

import styles from './swap-route-step.module.css';

interface Props {
    routeStep: RouteStepDisplayData;
}

export const SwapRouteStep: FC<Props> = ({routeStep}) => (
    <div className={styles.route_step_div}>
        <div className={styles.route_step_direction_div}>
            <img src={routeStep.dex.image} alt={routeStep.dex.name} />
            <img
                src={routeStep.inputAsset.image}
                alt={routeStep.inputAsset.symbol}
            />
            <img
                src={routeStep.outputAsset.image}
                alt={routeStep.outputAsset.symbol}
            />
        </div>
    </div>
);
