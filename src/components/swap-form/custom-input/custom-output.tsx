import {Asset} from 'rainbow-swap-sdk';
import {FC, memo} from 'react';

import {AssetSelector} from './asset-selector/asset-selector';
import styles from './custom-input.module.css';
import {useIsRoutesLoadingSelector} from '../../../store/swap-routes/swap-routes-selectors';
import {useAssetBalanceSelector} from '../../../store/wallet/wallet-selectors';
import {formatNumber} from '../../../utils/format-number.utils';
import {getClassName} from '../../../utils/style.utils';
import {Skeleton} from '../../skeleton/skeleton';

interface Props {
    inputValue: string;
    assetValue: Asset;
    onAssetValueChange: (newAssetValue: Asset) => void;
    isLoading: boolean;
    inputValueUsdAmount: number;
}

export const CustomOutput: FC<Props> = memo(
    ({
        inputValue,
        assetValue,
        onAssetValueChange,
        isLoading,
        inputValueUsdAmount
    }) => {
        const isRoutesLoading = useIsRoutesLoadingSelector();
        const balance = useAssetBalanceSelector(assetValue.address);

        return (
            <div className={styles.container}>
                <p className={styles.container_label}>You receive</p>
                <div className={styles.input_container}>
                    <div
                        className={getClassName(
                            styles.input_wrapper,
                            styles.output_wrapper
                        )}
                    >
                        <span
                            className={getClassName(
                                styles.span_field,
                                isRoutesLoading ? styles.span_pulsing : ''
                            )}
                        >
                            {inputValue}
                        </span>
                    </div>
                    <Skeleton isLoading={isLoading}>
                        <AssetSelector
                            value={assetValue}
                            headerTitle="Select output token"
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
                        </div>
                    </Skeleton>
                </div>
            </div>
        );
    }
);
