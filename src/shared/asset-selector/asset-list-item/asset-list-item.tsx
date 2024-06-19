import {FC} from 'react';
import {ListChildComponentProps} from 'react-window';

import styles from './asset-list-item.module.css';
import {AssetListItemProps} from './asset-list-item.props.ts';
import {parseBalance} from '../../../utils/balance-parse.utils.ts';
import {formatNumber} from '../../../utils/format-number.utils';
import {getClassName} from '../../../utils/style.utils';

export const AssetListItem: FC<
    ListChildComponentProps<AssetListItemProps[]>
> = ({index, style, data}) => {
    const item = data[index];

    const parsedBalance = formatNumber(
        parseBalance(item.balance, item.asset.decimals),
        2
    );
    const usdAmount =
        parseFloat(parsedBalance) * parseFloat(item.asset.exchangeRate);

    return (
        <div style={style} onClick={item.onClick}>
            <div
                className={getClassName(
                    styles.select_list_item_div,
                    item.isSelected ? styles.selected : ''
                )}
            >
                <div className={styles.select_list_item_wrapper}>
                    <img className={styles.img} src={item.asset.image} />
                    <div className={styles.select_list_item_info}>
                        <p className={styles.select_list_item_ccy}>
                            {item.asset.symbol}
                        </p>
                        <p className={styles.select_list_item_qty}>
                            {item.asset.name}
                        </p>
                    </div>
                </div>
                <div className={styles.select_list_item_balance}>
                    <p className={styles.coin_balance}>{parsedBalance}</p>
                    <p className={styles.dollar_balance}>
                        ≈{formatNumber(usdAmount, 2)}$
                    </p>
                </div>
            </div>
        </div>
    );
};
