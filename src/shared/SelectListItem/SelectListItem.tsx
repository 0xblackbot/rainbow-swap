import {FC} from 'react';

import styles from './SelectListItem.module.css';
import {AssetObject} from '../../interfaces/asset-object.interface';

interface Props {
    asset: AssetObject;
    onClick: (asset: AssetObject) => void;
}

export const SelectListItem: FC<Props> = ({asset, onClick}) => (
    <div className={styles.select_list_item_div} onClick={() => onClick(asset)}>
        <div className={styles.select_list_item_wrapper}>
            <img className={styles.img} src={asset.image} alt="" />
            <div className={styles.select_list_item_info}>
                <p className={styles.select_list_item_ccy}>{asset.name}</p>
                <p className={styles.select_list_item_qty}>
                    0.00 {asset.symbol}
                </p>
            </div>
        </div>
        <div className={styles.select_list_item_balance}>$0.00</div>
    </div>
);
