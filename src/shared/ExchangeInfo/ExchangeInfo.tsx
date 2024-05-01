import {FC} from 'react';

import {GasIcon} from '../../assets/icons/GasIcon/GasIcon';
import {IToken} from '../../interfaces/token.interface';
import './ExchangeInfo.css';

interface Props {
    inputToken: IToken;
    outputToken: IToken;
}

export const ExchangeInfo: FC<Props> = ({inputToken, outputToken}) => (
    <div className="exchange-info-div">
        <p>
            1 {inputToken.name} = 2 {outputToken.name} ($2.50)
        </p>
        <div className="gas-info-div">
            <GasIcon />
            <p>$0.03</p>
        </div>
    </div>
);
