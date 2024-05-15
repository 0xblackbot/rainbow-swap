import {FC} from 'react';
import {ListRowProps} from 'react-virtualized';

import styles from './asset-list-item.module.css';
import {Asset} from '../../../interfaces/asset.interface';
import {getClassName} from '../../../utils/style.utils';

interface Props extends Pick<ListRowProps, 'style'> {
    asset: Asset;
    onClick: (asset: Asset) => void;
    selectedAsset: Asset;
}

export const AssetListItem: FC<Props> = ({
    style,
    asset,
    onClick,
    selectedAsset
}) => {
    const handleClick = () => onClick(asset);
    const isSelected = asset.address === selectedAsset.address;

    return (
        <div style={style} onClick={handleClick}>
            <div
                className={
                    isSelected
                        ? getClassName(
                              styles.select_list_item_div,
                              styles.selected
                          )
                        : styles.select_list_item_div
                }
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
                    <p className={styles.coin_balance}>
                        {asset.balance
                            ? Number(asset.balance) / 10 ** asset.decimals
                            : '0.00'}
                    </p>
                    <p className={styles.dollar_balance}>≈0.00$</p>
                </div>
            </div>
        </div>
    );
};
