import {RouteStep} from 'rainbow-swap-sdk';
import {FC} from 'react';

import styles from './swap-route-step.module.css';
import {DEFAULT_DEXES_RECORD} from '../../../../../data/dexes-record';
import {useAssetSelector} from '../../../../../store/assets/assets-selectors';

interface Props {
    routeStep: RouteStep;
}

export const SwapRouteStep: FC<Props> = ({routeStep}) => {
    const inputAsset = useAssetSelector(routeStep.inputAssetAddress);
    const outputAsset = useAssetSelector(routeStep.outputAssetAddress);

    return (
        <div className={styles.route_step_div}>
            <div className={styles.route_step_direction_div}>
                <img src={DEFAULT_DEXES_RECORD[routeStep.dexType].image} />
                <img src={inputAsset.image}></img>
                <img src={outputAsset.image}></img>
            </div>
        </div>
    );
};
