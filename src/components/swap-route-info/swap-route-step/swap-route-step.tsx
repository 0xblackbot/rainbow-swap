import {FC} from 'react';

import styles from './swap-route-step.module.css';
import {DEFAULT_DEXES_RECORD} from '../../../data/dexes-record';
import {RouteStep} from '../../../interfaces/route-step.interface';
import {AssetsRecord} from '../../../types/assets-record.type';

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
