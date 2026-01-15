import {RiskToleranceButton} from './risk-tolerance-button';
import {RiskToleranceInfo} from './risk-tolerance-info';
import {RiskTolerance} from '../../../enums/risk-tolerance.enum';
import sharedStyles from '../settings-modal.module.css';

export const RiskToleranceSetting = () => (
    <>
        <div className={sharedStyles.title_container}>
            <p className={sharedStyles.title}>Risk Tolerance</p>
            <div className={sharedStyles.selector_container}>
                <RiskToleranceButton title="Safe" value={RiskTolerance.Safe} />
                <div className={sharedStyles.selector_divider} />
                <RiskToleranceButton
                    title="Normal"
                    value={RiskTolerance.Normal}
                />
                <div className={sharedStyles.selector_divider} />
                <RiskToleranceButton
                    title="Risky"
                    value={RiskTolerance.Risky}
                />
            </div>
        </div>
        <RiskToleranceInfo />
        <p className={sharedStyles.description}>
            Higher risk may offer better prices but also carries a greater
            chance of transaction failure and receiving intermediate tokens.
        </p>
    </>
);
