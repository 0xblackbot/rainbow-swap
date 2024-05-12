import {FC} from 'react';
import {ListRowProps} from 'react-virtualized';

import styles from './asset-list-item.module.css';
import {Asset} from '../../../interfaces/asset.interface';

interface Props extends Pick<ListRowProps, 'style'> {
    asset: Asset;
    onClick: (asset: Asset) => void;
}

export const AssetListItem: FC<Props> = ({style, asset, onClick}) => {
    const handleClick = () => onClick(asset);

    return (
        <div
            style={style}
            className={styles.select_list_item_div}
            onClick={handleClick}
        >
            <div className={styles.select_list_item_wrapper}>
                <img className={styles.img} src={asset.image} />
                <div className={styles.select_list_item_info}>
                    <p className={styles.select_list_item_ccy}>{asset.name}</p>
                    <p className={styles.select_list_item_qty}>
                        {asset.balance ? asset.balance : '0.00'} {asset.symbol}
                    </p>
                </div>
            </div>
            <div className={styles.select_list_item_balance}>$0.00</div>
        </div>
    );
};
