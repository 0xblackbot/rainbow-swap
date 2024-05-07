import {FC} from 'react';

import styles from './SelectListItem.module.css';
import {IAssetsPair} from '../../interfaces/assets.interface';

interface Props {
    token: IAssetsPair;
    onClick: (token: IAssetsPair) => void;
}

export const SelectListItem: FC<Props> = ({token, onClick}) => (
    <div className={styles.select_list_item_div} onClick={() => onClick(token)}>
        <div className={styles.select_list_item_wrapper}>
            <img className={styles.img} src={token.image} alt="" />
            <div className={styles.select_list_item_info}>
                <p className={styles.select_list_item_ccy}>{token.name}</p>
                <p className={styles.select_list_item_qty}>0.00 {token.name}</p>
            </div>
        </div>
        <div className={styles.select_list_item_balance}>$0.00</div>
    </div>
);
