import {Asset} from 'rainbow-swap-sdk';
import {ChangeEvent, forwardRef, useState} from 'react';

import {AssetSelector} from './asset-selector/asset-selector';
import styles from './custom-input.module.css';
import {formatNumber} from '../../../utils/format-number.utils';
import {getMaxSentAmount} from '../../../utils/get-max-sent-amount.utils';
import {Skeleton} from '../../skeleton/skeleton';

interface Props {
    isLoading: boolean;
    balance: string | undefined;
    inputValue: string;
    onInputValueChange: (newInputValue: string) => void;
    assetValue: Asset;
    onAssetValueChange: (newAssetValue: Asset) => void;
}

export const CustomInput = forwardRef<HTMLInputElement, Props>(
    (
        {
            isLoading,
            balance = '0',
            inputValue,
            onInputValueChange,
            assetValue,
            onAssetValueChange
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;
            value = value.replace(/,/g, '.');

            if (value.charAt(0) === '.' || value.charAt(0) === ',') {
                value = '0.';
            }
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

        const usdAmount = parseFloat(inputValue) * assetValue.usdExchangeRate;

        const setMaxAssetAmount = () => {
            const checkedBalance = getMaxSentAmount(
                balance,
                assetValue.address
            );

            onInputValueChange(checkedBalance);
        };

        const handleOverlayClick = () => {
            if (
                ref &&
                typeof ref !== 'function' &&
                document.activeElement !== ref.current
            ) {
                (ref as React.RefObject<HTMLInputElement>).current?.focus();
            }
        };

        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = () => {
            setIsFocused(false);
        };

        return (
            <div className={styles.container}>
                <p className={styles.container_label}>You send</p>
                <div className={styles.input_container}>
                    <div className={styles.input_wrapper}>
                        {!isFocused && (
                            <div
                                className={styles.input_overlay}
                                onClick={handleOverlayClick}
                            />
                        )}
                        <input
                            type="tel"
                            inputMode="decimal"
                            className={styles.input_field}
                            onChange={handleInputChange}
                            value={inputValue}
                            placeholder="0"
                            required={true}
                            ref={ref}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <div className={styles.empty_container} />
                    </div>
                    <Skeleton isLoading={isLoading}>
                        <AssetSelector
                            value={assetValue}
                            headerTitle="Select input token"
                            onChange={onAssetValueChange}
                        />
                    </Skeleton>
                </div>

                <div className={styles.input_info}>
                    <p className={styles.input_usd_balance}>
                        ${formatNumber(usdAmount, 2)}
                    </p>
                    <Skeleton isLoading={isLoading}>
                        <div className={styles.input_info_balance}>
                            <p>
                                {formatNumber(parseFloat(balance), 2)}{' '}
                                {assetValue.symbol}
                            </p>
                            <button
                                className={styles.input_info_button}
                                onClick={setMaxAssetAmount}
                            >
                                Max
                            </button>
                        </div>
                    </Skeleton>
                </div>
            </div>
        );
    }
);
