import {FC} from 'react';

import styles from './ExchangeInfo.module.css';
import {GasIcon} from '../../assets/icons/GasIcon/GasIcon';
import {IToken} from '../../interfaces/token.interface';

interface Props {
    inputToken: IToken;
    outputToken: IToken;
}

export const ExchangeInfo: FC<Props> = ({inputToken, outputToken}) => (
    <div className={styles.exchange_info_div}>
        <p>
            1 {inputToken.name} = 2 {outputToken.name} ($2.50)
        </p>
        <div className={styles.gas_info_div}>
            <GasIcon />
            <p className={styles.gas_info_div_p}>$0.03</p>
        </div>
    </div>
);
