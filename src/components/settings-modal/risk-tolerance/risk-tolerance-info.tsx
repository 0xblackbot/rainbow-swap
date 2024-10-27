import styles from './risk-tolerance.module.css';
import {RiskTolerance} from '../../../enums/risk-tolerance.enum';
import {useRiskToleranceSelector} from '../../../store/settings/settings-selectors';

const TitleRecord: Record<RiskTolerance, string> = {
    [RiskTolerance.Safe]: 'Safe',
    [RiskTolerance.Normal]: 'Normal',
    [RiskTolerance.Risky]: 'Risky'
};

const DescriptionRecord: Record<RiskTolerance, string> = {
    [RiskTolerance.Safe]: 'Lower risk, minimal route length.',
    [RiskTolerance.Normal]: 'Balanced risk and potential rewards.',
    [RiskTolerance.Risky]:
        'Better prices but increased chance of transaction failure.'
};

const ColorRecord: Record<RiskTolerance, string> = {
    [RiskTolerance.Safe]: '#34CC4E',
    [RiskTolerance.Normal]: '#3E88F7',
    [RiskTolerance.Risky]: '#FF5B00'
};

export const RiskToleranceInfo = () => {
    const riskTolerance = useRiskToleranceSelector();

    const title = TitleRecord[riskTolerance];
    const description = DescriptionRecord[riskTolerance];
    const color = ColorRecord[riskTolerance];

    return (
        <p className={styles.info_text}>
            <span style={{color: color}}>{title}: </span>
            <span style={{color: color, opacity: 0.7}}>{description}</span>
        </p>
    );
};
