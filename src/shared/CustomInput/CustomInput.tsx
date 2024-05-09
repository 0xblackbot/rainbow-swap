import {FC} from 'react';

import styles from './CustomInput.module.css';
import {useTonUIHooks} from '../../hooks/useTonUIHooks/useTonUIHooks';
import {Asset} from '../../interfaces/asset.interface';
import {CurrencySelector} from '../CurrencySelector/CurrencySelector';

interface Props {
    text: string;
    onClick: () => void;
    asset: Asset | undefined;
    value?: string;
    onChange?: (value: string) => void;
    isOutput?: boolean;
}

export const CustomInput: FC<Props> = ({
    text,
    asset,
    isOutput,
    value,
    onClick,
    onChange
}) => {
    const {wallet} = useTonUIHooks();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/,/g, '.');
        const regex = new RegExp(`^\\d*(\\.\\d{0,9})?$`);
        if (regex.test(value)) {
            const [integer, decimal] = value.split('.');
            if (decimal?.length > 9) {
                e.target.value = integer + '.' + decimal.slice(0, 9);
                onChange?.(e.target.value);
            } else {
                onChange?.(value);
            }
        }
    };

    const setMaxAssetAmount = () => {
        if (wallet) {
            onChange?.(asset?.balance?.toString() || '0');
        }
    };

    return (
        <div className={styles.container}>
            <p className={styles.container_label}>{text}</p>
            <div className={styles.input_container}>
                <input
                    type="number"
                    className={styles.input_field}
                    onChange={handleInputChange}
                    value={value}
                    placeholder="0"
                    disabled={isOutput}
                />
                <CurrencySelector
                    asset={asset}
                    isOutput={isOutput}
                    onClick={onClick}
                />
            </div>
            {wallet && !isOutput ? (
                <div className={styles.input_info}>
                    <p>$0.00</p>
                    <div className={styles.input_info_balance}>
                        <p>Balance: {asset?.balance ? asset.balance : '0'}</p>
                        <button
                            className={styles.input_info_button}
                            onClick={setMaxAssetAmount}
                        >
                            Max
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
