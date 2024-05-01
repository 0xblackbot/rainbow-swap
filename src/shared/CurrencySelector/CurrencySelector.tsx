import {useContext} from 'react';

import ChevronDownIcon from '../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {Context} from '../../context/ContextProvider';
import {IToken} from '../../interfaces/token.interface';
import './CurrencySelector.css';

interface CurrencySelectorProps {
    token: IToken | undefined;
    isOutput?: boolean;
    onClick: () => void;
}

const CurrencySelector = ({
    token,
    isOutput,
    onClick
}: CurrencySelectorProps) => {
    const {inputToken, outputToken} = useContext(Context);
    const tokenSelected = isOutput ? outputToken : inputToken;

    return (
        <>
            {tokenSelected !== undefined ? (
                <div className="selected-token-button" onClick={onClick}>
                    <img src={token?.imagePath} alt="123" />
                    <p>{token?.name}</p>
                    <ChevronDownIcon />
                </div>
            ) : (
                <div className="select-token-button" onClick={onClick}>
                    <p>Select token </p>
                    <ChevronDownIcon />
                </div>
            )}
        </>
    );
};

export default CurrencySelector;
