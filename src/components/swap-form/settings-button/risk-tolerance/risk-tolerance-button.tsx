import {FC} from 'react';

import {RiskTolerance} from '../../../../enums/risk-tolerance.enum';
import {useDispatch} from '../../../../store';
import {setRiskToleranceAction} from '../../../../store/settings/settings-actions';
import {useRiskToleranceSelector} from '../../../../store/settings/settings-selectors';
import {Button} from '../../../button/button';

interface Props {
    value: RiskTolerance;
    title: string;
}

export const RiskToleranceButton: FC<Props> = ({value, title}) => {
    const dispatch = useDispatch();
    const riskTolerance = useRiskToleranceSelector();

    const handleClick = () => dispatch(setRiskToleranceAction(value));

    return (
        <Button
            size="xs"
            mode={riskTolerance === value ? 'bezeled' : 'gray'}
            onClick={handleClick}
        >
            <span>{title}</span>
        </Button>
    );
};
