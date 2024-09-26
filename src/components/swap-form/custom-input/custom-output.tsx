import {Asset} from 'rainbow-swap-sdk';
import {FC, memo} from 'react';

import {AssetSelector} from './asset-selector/asset-selector';
import styles from './custom-input.module.css';
import {useIsRoutesLoadingSelector} from '../../../store/swap-routes/swap-routes-selectors';
import {formatNumber} from '../../../utils/format-number.utils';
import {getClassName} from '../../../utils/style.utils';

interface Props {
    balance: string | undefined;
    inputValue: string;
    assetValue: Asset;
    onAssetValueChange: (newAssetValue: Asset) => void;
}

export const CustomOutput: FC<Props> = memo(
    ({balance = '0', inputValue, assetValue, onAssetValueChange}) => {
        const isRoutesLoading = useIsRoutesLoadingSelector();

        const usdAmount = parseFloat(inputValue) * assetValue.usdExchangeRate;

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
                        <span className={styles.span_field}>{inputValue}</span>
                        <div className={styles.empty_container}>
                            {isRoutesLoading ? (
                                <div className={styles.loader_spinner} />
                            ) : null}
                        </div>
                    </div>
                    <AssetSelector
                        value={assetValue}
                        headerTitle="Select output token"
                        onChange={onAssetValueChange}
                    />
                </div>

                <div className={styles.input_info}>
                    <p className={styles.input_usd_balance}>
                        ${formatNumber(usdAmount, 2)}
                    </p>
                    <div className={styles.input_info_balance}>
                        <p>
                            {formatNumber(parseFloat(balance), 2)}{' '}
                            {assetValue.symbol}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
);
