import {RouteStepWithCalculation} from 'rainbow-swap-sdk';
import {FC, Fragment} from 'react';

import styles from './route-info.module.css';
import {SwapRouteStep} from './swap-route-step/swap-route-step';
import {useSwapForm} from '../../../hooks/swap-form/swap-form.hook';
import {useAssetSelector} from '../../../store/assets/assets-selectors';
import {fromNano} from '../../../utils/big-int.utils';
import {getRouteInputStep} from '../../../utils/route-step-with-calculation.utils';

interface Props {
    route: RouteStepWithCalculation[];
}

export const RouteInfo: FC<Props> = ({route}) => {
    const routeInputStep = getRouteInputStep(route);
    const {inputAssetAmount} = useSwapForm();
    const inputAsset = useAssetSelector(
        routeInputStep?.inputAssetAddress ?? ''
    );
    const routeInputAssetAmount = fromNano(
        BigInt(routeInputStep?.inputAssetAmount ?? ''),
        inputAsset.decimals
    );

    const routeInputAssetPercentage = (
        (parseFloat(routeInputAssetAmount) / parseFloat(inputAssetAmount)) *
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
