import GasIcon from '../../assets/icons/GasIcon/GasIcon';
import {IToken} from '../../interfaces/token.interface';
import './ExchangeInfo.css';

interface ExchangeInfoProps {
    inputToken: IToken;
    outputToken: IToken;
}

const ExchangeInfo = ({inputToken, outputToken}: ExchangeInfoProps) => {
    return (
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
};

export default ExchangeInfo;
