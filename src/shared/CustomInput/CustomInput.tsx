import {FC} from 'react';

import styles from './CustomInput.module.css';
import {useTonUI} from '../../hooks/use-ton-ui.hook';
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
    const {wallet} = useTonUI();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/,/g, '.');
        const regex = new RegExp(`^\\d*(\\.\\d{0,9})?$`);
        if (regex.test(value)) {
            const [integer, decimal] = value.split('.');
            if (asset && decimal?.length > asset.decimals) {
                e.target.value =
                    integer +
                    '.' +
                    decimal.slice(0, asset.decimals);
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
                    type="tel"
                    className={styles.input_field}
                    onChange={handleInputChange}
                    value={value}
                    placeholder="0"
                    disabled={isOutput}
                    required={!isOutput}
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
