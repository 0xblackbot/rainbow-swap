import {FC} from 'react';

import styles from './CurrencySelector.module.css';
import {ChevronDownIcon} from '../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {useAssetsContext} from '../../context/assets/assets.hook';
import {Asset} from '../../interfaces/asset.interface';

interface Props {
    asset: Asset | undefined;
    isOutput?: boolean;
    onClick: () => void;
}

export const CurrencySelector: FC<Props> = ({asset, isOutput, onClick}) => {
    const {inputAsset, outputAsset} = useAssetsContext();
    const assetSelected = isOutput ? outputAsset : inputAsset;

    return (
        <>
            {assetSelected !== undefined ? (
                <div className={styles.selected_asset_button} onClick={onClick}>
                    <img className={styles.img} src={asset?.image} alt="123" />
                    <p className={styles.p}>{asset?.symbol}</p>
                    <ChevronDownIcon />
                </div>
            ) : (
                <div className={styles.select_asset_button} onClick={onClick}>
                    <p className={styles.p}>Select asset </p>
                    <ChevronDownIcon />
                </div>
            )}
        </>
    );
};
