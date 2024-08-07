import {AssetsRecord, RouteStep} from 'rainbow-swap-sdk';
import {FC} from 'react';

import styles from './swap-route-step.module.css';
import {DEFAULT_DEXES_RECORD} from '../../../../data/dexes-record';

interface Props {
    routeStep: RouteStep;
    assetsRecord: AssetsRecord;
}

export const SwapRouteStep: FC<Props> = ({routeStep, assetsRecord}) => {
    const {inputAsset, outputAsset} = {
        inputAsset: assetsRecord[routeStep.inputAssetAddress],
        outputAsset: assetsRecord[routeStep.outputAssetAddress]
    };

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
