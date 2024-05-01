import useTonUIHooks from '../../hooks/useTonUIHooks/useTonUIHooks';
import {IToken} from '../../interfaces/token.interface';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import './CustomInput.css';
interface CustomInputProps {
    text: string;
    token: IToken | undefined;
    isOutput?: boolean;
    onClick: () => void;
}

const CustomInput = ({text, token, isOutput, onClick}: CustomInputProps) => {
    const {wallet} = useTonUIHooks();

    return (
        <div className="container">
            <p className="container-label">{text}</p>
            <div className="input-container">
                <input
                    type="number"
                    className="input-field"
                    placeholder="0"
                    disabled={isOutput}
                />
                <CurrencySelector
                    token={token}
                    isOutput={isOutput}
                    onClick={onClick}
                />
            </div>
            {wallet ? (
                <div className="input-info">
                    <p>$0.00</p>
                    <div className="input-info-balance">
                        <p>Balance: 0.000</p>
                        <button>Max</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default CustomInput;
