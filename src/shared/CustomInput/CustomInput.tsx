import {ChangeEvent, forwardRef} from 'react';

import styles from './CustomInput.module.css';
import {Asset} from '../../interfaces/asset.interface.ts';
import {EMPTY_FN} from '../../utils/emptyfn.ts';
import {formatNumber} from '../../utils/format-number.utils.ts';
import {AssetSelector} from '../asset-selector/asset-selector.tsx';

interface Props {
    label: string;
    balance: string | undefined;
    isInputEnabled: boolean;
    inputValue: string;
    onInputValueChange?: (newInputValue: string) => void;
    assetValue: Asset;
    onAssetValueChange: (newAssetValue: Asset) => void;
    isLoading?: boolean;
}

export const CustomInput = forwardRef<HTMLInputElement, Props>(
    (
        {
            label,
            isInputEnabled,
            inputValue,
            assetValue,
            isLoading,
            balance = '0',
            onInputValueChange = EMPTY_FN,
            onAssetValueChange
        },
        ref
    ) => {
        const handleInputChange = (e: ChangeEvent<HTMLSpanElement>) => {
            let value = e.target.textContent || '';
            value = value.replace(/,/g, '.');

            if (value.charAt(0) === '.' || value.charAt(0) === ',') {
                value = '0.';
            }

            const regex = new RegExp(`^\\d*(\\.\\d{0,9})?$`);
            if (regex.test(value)) {
                const [integer, decimal] = value.split('.');
                if (decimal?.length > assetValue.decimals) {
                    value =
                        integer + '.' + decimal.slice(0, assetValue.decimals);
                }
                onInputValueChange(value);
                e.target.textContent = value;
            } else {
                e.target.textContent = inputValue;
            }

            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(e.target);
            range.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(range);
        };
        const usdAmount =
            parseFloat(inputValue) * parseFloat(assetValue.exchangeRate);

        const setMaxAssetAmount = () => {
            onInputValueChange(balance);
        };

        return (
            <div className={styles.container}>
                <p className={styles.container_label}>{label}</p>
                <div className={styles.input_container}>
                    <AssetSelector
                        value={assetValue}
                        headerTitle="Select asset"
                        onChange={onAssetValueChange}
                    />
                    <div className={styles.input_wrapper}>
                        <div className={styles.empty_container}>
                            {isLoading ? (
                                <div className={styles.loader_spinner} />
                            ) : null}
                        </div>
                        <span
                            contentEditable={isInputEnabled}
                            suppressContentEditableWarning={true}
                            className={styles.input_field}
                            onInput={handleInputChange}
                            ref={ref}
                            inputMode="decimal"
                        >
                            {inputValue}
                        </span>
                    </div>
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
                    <p className={styles.input_usd_balance}>
                        ${formatNumber(usdAmount, 2)}
                    </p>
                </div>
            </div>
        );
    }
);
