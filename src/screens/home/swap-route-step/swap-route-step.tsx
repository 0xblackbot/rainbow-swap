import {FC} from 'react';

import styles from './swap-route-step.module.css';
import {ChevronRightIcon} from '../../../assets/icons/ChevronRightIcon/ChevronRightIcon';
import {RouteStep} from '../../../interfaces/route-step.interface';
import {useAssetsRecordSelector} from '../../../store/assets/assets-selectors';

interface Props {
    routeStep: RouteStep;
}

export const SwapRouteStep: FC<Props> = ({routeStep}) => {
    const assetsRecord = useAssetsRecordSelector();
    const {inputAsset, outputAsset} = {
        inputAsset: assetsRecord[routeStep.inputAssetAddress],
        outputAsset: assetsRecord[routeStep.outputAssetAddress]
    };

    return (
        <div className={styles.route_step_div}>
            <p>{routeStep.dexType}</p>
            <div className={styles.route_step_direction_div}>
                <img src={inputAsset.image}></img>
                <ChevronRightIcon />
                <img src={outputAsset.image}></img>
            </div>
        </div>
    );
};
