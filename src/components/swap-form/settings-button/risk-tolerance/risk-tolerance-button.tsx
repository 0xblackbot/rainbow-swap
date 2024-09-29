import {FC} from 'react';

import styles from './risk-tolerance.module.css';
import {RiskTolerance} from '../../../../enums/risk-tolerance.enum';
import {useDispatch} from '../../../../store';
import {setRiskToleranceAction} from '../../../../store/settings/settings-actions';
import {useRiskToleranceSelector} from '../../../../store/settings/settings-selectors';
import {getClassName} from '../../../../utils/style.utils';

interface Props {
    value: RiskTolerance;
    title: string;
}

export const RiskToleranceButton: FC<Props> = ({value, title}) => {
    const dispatch = useDispatch();
    const riskTolerance = useRiskToleranceSelector();

    const handleClick = () => dispatch(setRiskToleranceAction(value));

    return (
        <p
            className={getClassName(
                styles.selector_item,
                riskTolerance === value ? styles.selector_item_selected : ''
            )}
            onClick={handleClick}
        >
            {title}
        </p>
    );
};
