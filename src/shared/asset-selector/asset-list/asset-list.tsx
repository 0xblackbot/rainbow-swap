import {ChangeEvent, FC, useMemo, useState} from 'react';
import {FixedSizeList} from 'react-window';

import {SearchIcon} from '../../../assets/icons/SearchIcon/SearchIcon.tsx';
import {XCircledIcon} from '../../../assets/icons/XCircledIcon/XCircledIcon.tsx';
import {useDivHeight} from '../../../hooks/use-div-height.hook.ts';
import {Asset} from '../../../interfaces/asset.interface.ts';
import {useAssetsListSelector} from '../../../store/assets/assets-selectors.ts';
import {useBalancesSelector} from '../../../store/wallet/wallet-selectors.ts';
import {AssetListItemProps} from '../asset-list-item/asset-list-item.props.ts';
import {AssetListItem} from '../asset-list-item/asset-list-item.tsx';
import {AssetNoResult} from '../asset-no-result/asset-no-result.tsx';
import styles from '../asset-selector.module.css';
import {sortAssets} from '../utils/sort-assets.utils.ts';

interface Props {
    value: Asset;
    onChange: (newValue: Asset) => void;
}

export const AssetList: FC<Props> = ({value, onChange}) => {
    const divHeight = useDivHeight();

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
                balance: balances[asset.address] ?? '0',
                isSelected: asset.address === value.address,
                onClick: () => {
                    setSearchValue('');
                    onChange(asset);
                }
            })),
        [balances, filteredAssetsList, onChange, value.address]
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
        setSearchValue(event.target.value);
    const handleInputClear = () => setSearchValue('');

    return (
        <>
            <div className={styles.modalInputContainer}>
                <input
                    className={styles.modalInput}
                    placeholder="Search"
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
