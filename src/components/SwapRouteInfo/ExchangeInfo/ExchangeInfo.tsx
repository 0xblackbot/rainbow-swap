import {FC} from 'react';

import styles from './ExchangeInfo.module.css';
import {GasIcon} from '../../../assets/icons/GasIcon/GasIcon.tsx';

interface Props {
    inputAssetSymbol: string;
    outputAssetSymbol: string;
}

export const ExchangeInfo: FC<Props> = ({
    inputAssetSymbol,
    outputAssetSymbol
}) => (
    <div className={styles.exchange_info_div}>
        <p>
            1 {inputAssetSymbol} = 2 {outputAssetSymbol} ($2.50)
        </p>
        <div className={styles.gas_info_div}>
            <GasIcon />
            <p className={styles.gas_info_div_p}>$0.03</p>
        </div>
    </div>
);
