import {FC, useState} from 'react';
import {ListRowProps} from 'react-virtualized';

import styles from './asset-list-item.module.css';
import {Asset} from '../../../interfaces/asset.interface';
import {formatNumber} from '../../../utils/format-number.utils';
import {getClassName} from '../../../utils/style.utils';

interface Props extends Pick<ListRowProps, 'style'> {
    asset: Asset;
    onClick: (asset: Asset) => void;
    selectedAsset: Asset;
    balance: string | undefined;
}

export const AssetListItem: FC<Props> = ({
    style,
    asset,
    onClick,
    selectedAsset,
    balance = '0'
}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        onClick(asset);
    };

    const isSelected = asset.address === selectedAsset.address;
    const usdAmount = parseFloat(balance) * parseFloat(asset.exchangeRate);

    return (
        <div style={style} onClick={handleClick}>
            <div
                className={getClassName(
                    styles.select_list_item_div,
                    isClicked ? styles.clicked : '',
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
                        ≈{formatNumber(usdAmount, 5)}$
                    </p>
                </div>
            </div>
        </div>
    );
};
