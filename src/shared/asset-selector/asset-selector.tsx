import {ChangeEvent, FC, useMemo, useState} from 'react';
import {FixedSizeList} from 'react-window';

import {AssetListItemProps} from './asset-list-item/asset-list-item.props.ts';
import {AssetListItem} from './asset-list-item/asset-list-item.tsx';
import styles from './asset-selector.module.css';
import {sortAssets} from './utils/sort-assets.utils.ts';
import {ChevronRightIcon} from '../../assets/icons/ChevronRightIcon/ChevronRightIcon.tsx';
import {SearchIcon} from '../../assets/icons/SearchIcon/SearchIcon.tsx';
import {XCircleIcon} from '../../assets/icons/XCircleIcon/XCircleIcon.tsx';
import {BottomSheet} from '../../components/bottom-sheet/bottom-sheet.tsx';
import {useDivHeight} from '../../hooks/use-div-height.hook.tsx';
import {Asset} from '../../interfaces/asset.interface';
import {useAssetsListSelector} from '../../store/assets/assets-selectors.ts';
import {useBalancesSelector} from '../../store/wallet/wallet-selectors.ts';

interface Props {
    value: Asset;
    headerTitle: string;
    onChange: (newValue: Asset) => void;
}

export const AssetSelector: FC<Props> = ({value, headerTitle, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const divHeight = useDivHeight();

    const balances = useBalancesSelector();
    const assetsList = useAssetsListSelector();

    const sortedAssetsList = useMemo(
        () => sortAssets(assetsList, balances),
        [assetsList, balances]
    );

    const [searchValue, setSearchValue] = useState('');
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
                balance: balances[asset.address],
                isSelected: asset.address === value.address,
                onClick: () => {
                    setIsOpen(false);
                    setSearchValue('');
                    onChange(asset);
                }
            })),
        [balances, filteredAssetsList, onChange, value.address]
    );

    const handleOpen = () => setIsOpen(true);
    const handleDismiss = () => setIsOpen(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
        setSearchValue(event.target.value);
    const handleInputClear = () => setSearchValue('');

    console.log(divHeight.height);

    return (
        <>
            <div className={styles.selected_asset_button} onClick={handleOpen}>
                <img className={styles.img} src={value.image} />
                <p className={styles.p}>{value.symbol}</p>
                <ChevronRightIcon />
            </div>

            <BottomSheet
                isOpen={isOpen}
                onClose={handleDismiss}
                headerTitle={headerTitle}
            >
                <div className={styles.modalInputContainer}>
                    <input
                        className={styles.modalInput}
                        placeholder="Search assets"
                        value={searchValue}
                        onChange={handleInputChange}
                    />
                    <SearchIcon
                        className={styles.searchIcon}
                        width="18px"
                        height="18px"
                    />
                    {searchValue && (
                        <XCircleIcon
                            className={styles.xcircleIcon}
                            width="20px"
                            height="20px"
                            onClick={handleInputClear}
                        />
                    )}
                </div>
                <div ref={divHeight.ref} className={styles.assets_list}>
                    <FixedSizeList
                        height={divHeight.height}
                        width="100%"
                        itemSize={66}
                        itemCount={listProps.length}
                        itemData={listProps}
                    >
                        {AssetListItem}
                    </FixedSizeList>
                </div>
            </BottomSheet>
        </>
    );
};
