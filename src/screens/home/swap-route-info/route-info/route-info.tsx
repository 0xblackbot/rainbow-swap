import {FC, Fragment, useContext} from 'react';

import styles from './route-info.module.css';
import {SwapFormContext} from '../../../../hooks/swap-form/swap-form.context';
import {RouteStepWithCalculation} from '../../../../interfaces/route-step-with-calculation.interface';
import {useAssetsRecordSelector} from '../../../../store/assets/assets-selectors';
import {fromNano} from '../../../../utils/big-int.utils';
import {
    getRouteInputStep,
    getRouteOutputStep
} from '../../../../utils/route-step-with-calculation.utils';
import {SwapRouteStep} from '../../swap-route-step/swap-route-step';

interface Props {
    route: RouteStepWithCalculation[];
}

export const RouteInfo: FC<Props> = ({route}) => {
    const assetsRecord = useAssetsRecordSelector();
    const routeInputStep = getRouteInputStep(route);
    const routeOutputStep = getRouteOutputStep(route);
    const {inputAssetAmount} = useContext(SwapFormContext);
    const {inputAsset, outputAsset} = {
        inputAsset: assetsRecord[routeInputStep?.inputAssetAddress ?? ''],
        outputAsset: assetsRecord[routeOutputStep?.outputAssetAddress ?? '']
    };
    const {routeInputAssetAmount, routeOutputAssetAmount} = {
        routeInputAssetAmount: fromNano(
            BigInt(routeInputStep?.inputAssetAmount ?? ''),
            inputAsset.decimals
        ),
        routeOutputAssetAmount: fromNano(
            BigInt(routeOutputStep?.outputAssetAmount ?? ''),
            outputAsset.decimals
        )
    };

    const routeInputAssetPercantage = (
        (parseFloat(routeInputAssetAmount) / parseFloat(inputAssetAmount)) *
        100
    ).toFixed(1);

    return (
        <div className={styles.route}>
            <div className={styles.route_info}>
                <p>{routeInputAssetAmount}</p>
                <p>{routeInputAssetPercantage + '%'}</p>
            </div>
            {route.map((routeStep, index) => (
                <Fragment key={`route-step-${index}`}>
                    {index === 0 ? <div className={styles.dots}></div> : null}
                    <SwapRouteStep
                        assetsRecord={assetsRecord}
                        routeStep={routeStep}
                    />
                    <div className={styles.dots}></div>
                </Fragment>
            ))}
            <div className={styles.route_info}>
                <p>{routeOutputAssetAmount}</p>
                <p>{routeInputAssetPercantage + '%'}</p>
            </div>
        </div>
    );
};
