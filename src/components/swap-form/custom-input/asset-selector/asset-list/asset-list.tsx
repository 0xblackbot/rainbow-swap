import {Asset} from 'rainbow-swap-sdk';
import {ChangeEvent, FC, useEffect, useMemo, useRef, useState} from 'react';
import {FixedSizeList} from 'react-window';

import {AssetListItem} from './asset-list-item/asset-list-item';
import {AssetListItemProps} from './asset-list-item/asset-list-item.props';
import {SearchIcon} from '../../../../../assets/icons/SearchIcon/SearchIcon';
import {XCircledIcon} from '../../../../../assets/icons/XCircledIcon/XCircledIcon';
import {useDivHeight} from '../../../../../hooks/use-div-height.hook';
import {useAssetsListSelector} from '../../../../../store/assets/assets-selectors';
import {useBalancesSelector} from '../../../../../store/wallet/wallet-selectors';
import {formatNumber} from '../../../../../utils/format-number.utils';
import {AssetNoResult} from '../asset-no-result/asset-no-result';
import styles from '../asset-selector.module.css';
import {sortAssets} from '../utils/sort-assets.utils';

interface Props {
    isOpen: boolean;
    value: Asset;
    onChange: (newValue: Asset) => void;
}

export const AssetList: FC<Props> = ({isOpen, value, onChange}) => {
    const divHeight = useDivHeight();
    const inputRef = useRef<HTMLInputElement>(null);

    const [searchValue, setSearchValue] = useState('');

    const balances = useBalancesSelector();
    const assetsList = useAssetsListSelector();

    const sortedAssetsList = useMemo(
        () => sortAssets(assetsList, balances),
        [assetsList, balances]
    );

    const filteredAssetsList = useMemo(() => {
        if (searchValue === '') {
            return sortedAssetsList;
        }

        const lowercaseSearchTerm = searchValue.toLowerCase();

        return sortedAssetsList.filter(
            asset =>
                asset.symbol.toLowerCase().includes(lowercaseSearchTerm) ||
                asset.name.toLowerCase().includes(lowercaseSearchTerm) ||
                asset.address.toLowerCase().includes(lowercaseSearchTerm)
        );
    }, [sortedAssetsList, searchValue]);

    const listProps = useMemo<AssetListItemProps[]>(
        () =>
            filteredAssetsList.map(asset => ({
                asset,
                balance:
                    formatNumber(parseFloat(balances[asset.address]), 2) ?? '0',
                isSelected: asset.address === value.address,
                onClick: () => {
                    setSearchValue('');
                    onChange(asset);
                }
            })),
        [balances, filteredAssetsList, onChange, value.address]
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isOpen && inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [isOpen]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
        setSearchValue(event.target.value);
    const handleInputClear = () => setSearchValue('');

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
                {listProps.length === 0 ? (
                    <AssetNoResult />
                ) : (
                    <FixedSizeList
                        height={divHeight.height}
                        width="100%"
                        className={styles.fixed_size_list}
                        itemSize={66}
                        itemCount={listProps.length}
                        itemData={listProps}
                    >
                        {AssetListItem}
                    </FixedSizeList>
                )}
            </div>
        </>
    );
};
