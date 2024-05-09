import {FC} from 'react';

import styles from './ExchangeInfo.module.css';
import {GasIcon} from '../../assets/icons/GasIcon/GasIcon';
import {Asset} from '../../interfaces/asset.interface';

interface Props {
    inputAsset: Asset;
    outputAsset: Asset;
}

export const ExchangeInfo: FC<Props> = ({inputAsset, outputAsset}) => (
    <div className={styles.exchange_info_div}>
        <p>
            1 {inputAsset.symbol} = 2 {outputAsset.symbol} ($2.50)
        </p>
        <div className={styles.gas_info_div}>
            <GasIcon />
            <p className={styles.gas_info_div_p}>$0.03</p>
        </div>
    </div>
);
