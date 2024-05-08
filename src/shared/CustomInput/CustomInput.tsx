import {FC} from 'react';

import styles from './CustomInput.module.css';
import {useTonUIHooks} from '../../hooks/useTonUIHooks/useTonUIHooks';
import {AssetObject} from '../../interfaces/asset-object.interface';
import {CurrencySelector} from '../CurrencySelector/CurrencySelector';
interface Props {
    text: string;
    asset: AssetObject | undefined;
    isOutput?: boolean;
    onClick: () => void;
}

export const CustomInput: FC<Props> = ({text, asset, isOutput, onClick}) => {
    const {wallet} = useTonUIHooks();

    return (
        <div className={styles.container}>
            <p className={styles.container_label}>{text}</p>
            <div className={styles.input_container}>
                <input
                    type="number"
                    className={styles.input_field}
                    placeholder="0"
                    disabled={isOutput}
                />
                <CurrencySelector
                    asset={asset}
                    isOutput={isOutput}
                    onClick={onClick}
                />
            </div>
            {wallet ? (
                <div className={styles.input_info}>
                    <p>$0.00</p>
                    <div className={styles.input_info_balance}>
                        <p>Balance: 0.000</p>
                        <button className={styles.input_info_button}>
                            Max
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
