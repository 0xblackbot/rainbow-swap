import {Asset} from 'rainbow-swap-sdk';
import {ChangeEvent, forwardRef, useState} from 'react';

import {AssetSelector} from './asset-selector/asset-selector';
import styles from './custom-input.module.css';
import {useAssetBalanceSelector} from '../../../store/wallet/wallet-selectors';
import {formatNumber} from '../../../utils/format-number.utils';
import {getMaxSentAmount} from '../../../utils/get-max-sent-amount.utils';
import {getClassName} from '../../../utils/style.utils';
import {Button} from '../../button/button';
import {Skeleton} from '../../skeleton/skeleton';

interface Props {
    inputValue: string;
    onInputValueChange: (newInputValue: string) => void;
    assetValue: Asset;
    onAssetValueChange: (newAssetValue: Asset) => void;
    isError: boolean;
    isLoading: boolean;
    inputValueUsdAmount: number;
}

export const CustomInput = forwardRef<HTMLInputElement, Props>(
    (
        {
            inputValue,
            onInputValueChange,
            assetValue,
            onAssetValueChange,
            isError,
            isLoading,
            inputValueUsdAmount
        },
        ref
    ) => {
        const balance = useAssetBalanceSelector(assetValue.address);

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
                            className={getClassName(
                                styles.input_field,
                                isError ? styles.input_field_error : ''
                            )}
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
                        ${formatNumber(inputValueUsdAmount, 2)}
                    </p>
                    <Skeleton isLoading={isLoading}>
                        <div className={styles.input_info_balance}>
                            <p>
                                {formatNumber(parseFloat(balance), 2)}{' '}
                                {assetValue.symbol}
                            </p>
                            <Button
                                size="xs"
                                mode="bezeled"
                                className={styles.max_button}
                                onClick={setMaxAssetAmount}
                            >
                                <span>Max</span>
                            </Button>
                        </div>
                    </Skeleton>
                </div>
            </div>
        );
    }
);
