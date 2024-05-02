import {FC, useContext} from 'react';

import styles from './CurrencySelector.module.css';
import ChevronDownIcon from '../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {InputOutputContext} from '../../context/input-output.context';
import {IToken} from '../../interfaces/token.interface';

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
                <div className={styles.selected_token_button} onClick={onClick}>
                    <img
                        className={styles.img}
                        src={token?.imagePath}
                        alt="123"
                    />
                    <p className={styles.p}>{token?.name}</p>
                    <ChevronDownIcon />
                </div>
            ) : (
                <div className={styles.select_token_button} onClick={onClick}>
                    <p className={styles.p}>Select token </p>
                    <ChevronDownIcon />
                </div>
            )}
        </>
    );
};
