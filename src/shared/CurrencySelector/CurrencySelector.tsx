import {FC, useContext} from 'react';

import ChevronDownIcon from '../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {InputOutputContext} from '../../context/input-output.context';
import {IToken} from '../../interfaces/token.interface';
import './CurrencySelector.css';

interface Props {
    token: IToken | undefined;
    isOutput?: boolean;
    onClick: () => void;
}

export const CurrencySelector: FC<Props> = ({token, isOutput, onClick}) => {
    const {inputToken, outputToken} = useContext(InputOutputContext);
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
