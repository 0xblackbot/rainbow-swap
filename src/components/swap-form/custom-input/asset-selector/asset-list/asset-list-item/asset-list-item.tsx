import {FC} from 'react';
import {ListChildComponentProps} from 'react-window';

import styles from './asset-list-item.module.css';
import {AssetListItemProps} from './asset-list-item.props';
import {AlertIcon} from '../../../../../../assets/icons/AlertIcon/AlertIcon';
import {formatNumber} from '../../../../../../utils/format-number.utils';

export const AssetListItem: FC<
    ListChildComponentProps<AssetListItemProps[]>
> = ({index, style, data}) => {
    const item = data[index];

    const usdAmount = parseFloat(item.balance) * item.asset.usdExchangeRate;

    return (
        <div style={style} onClick={item.onClick}>
            <div className={styles.select_list_item_div}>
                <div className={styles.select_list_item_wrapper}>
                    <img className={styles.img} src={item.asset.image} />
                    <div className={styles.select_list_item_info}>
                        <div className={styles.select_list_item_header}>
                            <p className={styles.asset_symbol}>
                                {item.asset.symbol}
                            </p>
                            {item.asset.verification !== 'whitelist' && (
                                <AlertIcon
                                    width={16}
                                    height={16}
                                    className={styles.select_list_item_alert}
                                />
                            )}
                        </div>
                        <p className={styles.asset_name}>{item.asset.name}</p>
                    </div>
                </div>
                <div className={styles.select_list_item_balance}>
                    <p className={styles.coin_balance}>{item.balance}</p>
                    <p className={styles.dollar_balance}>
                        ≈{formatNumber(usdAmount, 2)}$
                    </p>
                </div>
            </div>
        </div>
    );
};
