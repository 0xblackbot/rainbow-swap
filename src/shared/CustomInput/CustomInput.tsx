import {ChangeEvent, ForwardedRef, forwardRef} from 'react';

import styles from './CustomInput.module.css';
import {Asset} from '../../interfaces/asset.interface';
import {EMPTY_FN} from '../../utils/emptyfn.ts';
import {AssetSelector} from '../asset-selector/asset-selector.tsx';

interface Props {
    label: string;
    isInputEnabled: boolean;
    inputValue: string;
    assetValue: Asset;
    balance?: string | undefined;
    ref?: ForwardedRef<HTMLInputElement>;
    onInputValueChange?: (newInputValue: string) => void;
    onAssetValueChange: (newAssetValue: Asset) => void;
}

export const CustomInput = forwardRef<HTMLInputElement, Props>(
    (
        {
            label,
            isInputEnabled,
            inputValue,
            assetValue,
            balance = '0',
            onInputValueChange = EMPTY_FN,
            onAssetValueChange
        },
        ref
    ) => {
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;
            value = value.replace(/,/g, '.');
            const regex = new RegExp(`^\\d*(\\.\\d{0,9})?$`);
            if (regex.test(value)) {
                const [integer, decimal] = value.split('.');
                if (decimal?.length > assetValue.decimals) {
                    e.target.value =
                        integer + '.' + decimal.slice(0, assetValue.decimals);
                    onInputValueChange(e.target.value);
                } else {
                    onInputValueChange(value);
                }
            }
        };

        const setMaxAssetAmount = () => {
            onInputValueChange(balance);
        };

        return (
            <div className={styles.container}>
                <p className={styles.container_label}>{label}</p>
                <div className={styles.input_container}>
                    <AssetSelector
                        value={assetValue}
                        onChange={onAssetValueChange}
                    />
                    <input
                        type="tel"
                        className={styles.input_field}
                        onChange={handleInputChange}
                        value={inputValue}
                        placeholder="0"
                        disabled={!isInputEnabled}
                        required={isInputEnabled}
                        ref={ref}
                    />
                </div>

                <div className={styles.input_info}>
                    <div className={styles.input_info_balance}>
                        <p>Balance: {balance}</p>
                        {isInputEnabled ? (
                            <button
                                className={styles.input_info_button}
                                onClick={setMaxAssetAmount}
                            >
                                Max
                            </button>
                        ) : null}
                    </div>
                    <p>$0.00</p>
                </div>
            </div>
        );
    }
);
