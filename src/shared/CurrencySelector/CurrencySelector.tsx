import {FC, useContext} from 'react';

import styles from './CurrencySelector.module.css';
import ChevronDownIcon from '../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {InputOutputContext} from '../../context/input-output.context';
import {IAssets} from '../../interfaces/assets.interface';

interface Props {
    token: IAssets | undefined;
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
                    <img className={styles.img} src={token?.image} alt="123" />
                    <p className={styles.p}>{token?.symbol}</p>
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
