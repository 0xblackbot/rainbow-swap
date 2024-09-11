import {Asset} from 'rainbow-swap-sdk';
import {FC, memo} from 'react';

import {AssetSelector} from './asset-selector/asset-selector';
import styles from './custom-input.module.css';
import {useIsRoutesLoadingSelector} from '../../../store/swap-routes/swap-routes-selectors';
import {formatNumber} from '../../../utils/format-number.utils';

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
                    <AssetSelector
                        value={assetValue}
                        headerTitle="Select output asset"
                        onChange={onAssetValueChange}
                    />
                    <div className={styles.input_wrapper}>
                        <div className={styles.empty_container}>
                            {isRoutesLoading ? (
                                <div className={styles.loader_spinner} />
                            ) : null}
                        </div>
                        <span className={styles.span_field}>{inputValue}</span>
                    </div>
                </div>

                <div className={styles.input_info}>
                    <div className={styles.input_info_balance}>
                        <p>Balance: {formatNumber(parseFloat(balance), 2)}</p>
                    </div>
                    <p className={styles.input_usd_balance}>
                        ${formatNumber(usdAmount, 2)}
                    </p>
                </div>
            </div>
        );
    }
);
