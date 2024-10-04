import {DexTypeEnum, RouteStep} from 'rainbow-swap-sdk';
import {FC} from 'react';

import dedustLogo from './assets/dedust.png';
import stonLogo from './assets/ston.png';
import styles from './swap-route-step.module.css';
import {useAssetSelector} from '../../../../../store/assets/assets-selectors';

interface Props {
    routeStep: RouteStep;
}

const LogoRecord: Record<DexTypeEnum, string> = {
    [DexTypeEnum.DeDust]: dedustLogo,
    [DexTypeEnum.DeDustStable]: dedustLogo,
    [DexTypeEnum.Ston]: stonLogo,
    [DexTypeEnum.Ston_v2]: stonLogo
};

export const SwapRouteStep: FC<Props> = ({routeStep}) => {
    const inputAsset = useAssetSelector(routeStep.inputAssetAddress);
    const outputAsset = useAssetSelector(routeStep.outputAssetAddress);

    return (
        <div className={styles.route_step_div}>
            <div className={styles.route_step_direction_div}>
                <img
                    src={LogoRecord[routeStep.dexPair.dexType]}
                    alt={routeStep.dexPair.dexType}
                />
                <img src={inputAsset.image} alt={inputAsset.symbol} />
                <img src={outputAsset.image} alt={outputAsset.symbol} />
            </div>
        </div>
    );
};
