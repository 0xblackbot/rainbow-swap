import {FC} from 'react';
import {ListRowProps} from 'react-virtualized';

import styles from './asset-list-item.module.css';
import {Asset} from '../../../interfaces/asset.interface';
import {formatNumber} from '../../../utils/format-number.utils';
import {getUsdValue} from '../../../utils/get-usd-value.utils';
import {getClassName} from '../../../utils/style.utils';

interface Props extends Pick<ListRowProps, 'style'> {
    asset: Asset;
    onClick: (asset: Asset) => void;
    selectedAsset: Asset;
    balance: string | undefined;
    tonPrice: number | undefined;
}

export const AssetListItem: FC<Props> = ({
    style,
    asset,
    onClick,
    selectedAsset,
    tonPrice = 0,
    balance = '0'
}) => {
    const handleClick = () => onClick(asset);

    const isSelected = asset.address === selectedAsset.address;
    const usdAmount = getUsdValue(
        balance,
        tonPrice,
        asset.exchangeRate,
        asset.decimals
    );

    return (
        <div style={style} onClick={handleClick}>
            <div
                className={getClassName(
                    styles.select_list_item_div,
                    isSelected ? styles.selected : ''
                )}
            >
                <div className={styles.select_list_item_wrapper}>
                    <img className={styles.img} src={asset.image} />
                    <div className={styles.select_list_item_info}>
                        <p className={styles.select_list_item_ccy}>
                            {asset.symbol}
                        </p>
                        <p className={styles.select_list_item_qty}>
                            {asset.name}
                        </p>
                    </div>
                </div>
                <div className={styles.select_list_item_balance}>
                    <p className={styles.coin_balance}>{balance}</p>
                    <p className={styles.dollar_balance}>
                        ≈{formatNumber(usdAmount, 2)}$
                    </p>
                </div>
            </div>
        </div>
    );
};
