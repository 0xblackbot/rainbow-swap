import {Asset} from 'rainbow-swap-sdk';
import {ChangeEvent, FC, useEffect, useMemo, useRef} from 'react';
import {FixedSizeList} from 'react-window';

import {AssetListItem} from './asset-list-item/asset-list-item';
import {AssetListItemProps} from './asset-list-item/asset-list-item.props';
import {SearchIcon} from '../../../../../assets/icons/SearchIcon/SearchIcon';
import {XCircledIcon} from '../../../../../assets/icons/XCircledIcon/XCircledIcon';
import {IS_TMA} from '../../../../../globals';
import {useDivHeight} from '../../../../../hooks/use-div-height.hook';
import {useDispatch} from '../../../../../store';
import {setAssetsListSearchValue} from '../../../../../store/assets/assets-actions';
import {
    useAssetsListSearchValueSelector,
    useAssetsListSelector
} from '../../../../../store/assets/assets-selectors';
import {useBalancesRecordSelector} from '../../../../../store/wallet/wallet-selectors';
import {formatNumber} from '../../../../../utils/format-number.utils';
import {AssetNoResult} from '../asset-no-result/asset-no-result';
import styles from '../asset-selector.module.css';
import {sortAssets} from '../utils/sort-assets.utils';

interface Props {
    isOpen: boolean;
    value: Asset;
    onChange: (newValue: Asset) => void;
}

export const AssetList: FC<Props> = ({isOpen, onChange}) => {
    const divHeight = useDivHeight();
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const searchValue = useAssetsListSearchValueSelector();

    const assetsList = useAssetsListSelector();
    const balancesRecord = useBalancesRecordSelector();

    const sortedAssetsList = useMemo(
        () => sortAssets(assetsList.data, balancesRecord),
        [assetsList.data, balancesRecord]
    );

    const listProps = useMemo<AssetListItemProps>(
        () => ({
            dataArray: sortedAssetsList.map(asset => ({
                asset,
                balance:
                    formatNumber(
                        parseFloat(balancesRecord[asset.address]),
                        2
                    ) ?? '0',
                onClick: () => onChange(asset)
            }))
        }),
        [sortedAssetsList, balancesRecord, onChange]
    );

    const itemCount =
        searchValue === ''
            ? listProps.dataArray.length + 1 // Search hint component
            : listProps.dataArray.length;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!IS_TMA && isOpen && inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [isOpen]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setAssetsListSearchValue(event.target.value));
    const handleInputClear = () => dispatch(setAssetsListSearchValue(''));

    return (
        <>
            <div className={styles.modalInputContainer}>
                <input
                    ref={inputRef}
                    className={styles.modalInput}
                    placeholder="Search tokens"
                    value={searchValue}
                    onChange={handleInputChange}
                />
                <SearchIcon
                    className={styles.searchIcon}
                    width="18px"
                    height="18px"
                />
                {searchValue && (
                    <XCircledIcon
                        className={styles.xcircleIcon}
                        width="20px"
                        height="20px"
                        onClick={handleInputClear}
                    />
                )}
            </div>
            <div ref={divHeight.ref} className={styles.assets_list}>
                {listProps.dataArray.length === 0 ? (
                    <AssetNoResult />
                ) : (
                    <FixedSizeList
                        itemSize={66}
                        itemData={listProps}
                        itemCount={itemCount}
                        width="100%"
                        height={divHeight.height}
                        className={styles.fixed_size_list}
                    >
                        {AssetListItem}
                    </FixedSizeList>
                )}
            </div>
        </>
    );
};
