import {debounce} from 'lodash-es';
import {FC, useMemo, useState} from 'react';
import Sheet from 'react-modal-sheet';
import {List} from 'react-virtualized';

import {AssetListItem} from './asset-list-item/asset-list-item.tsx';
import styles from './asset-selector.module.css';
import {sortAssets} from './utils/sort-assets.utils.ts';
import {ChevronRightIcon} from '../../assets/icons/ChevronRightIcon/ChevronRightIcon.tsx';
import {SearchIcon} from '../../assets/icons/SearchIcon/SearchIcon.tsx';
import {XCircleIcon} from '../../assets/icons/XCircleIcon/XCircleIcon.tsx';
import {useModalWidth} from '../../hooks/use-modal-width.hook.tsx';
import {Asset} from '../../interfaces/asset.interface';
import {useAssetsListSelector} from '../../store/assets/assets-selectors.ts';
import {useBalancesSelector} from '../../store/wallet/wallet-selectors.ts';

interface Props {
    value: Asset;
    onChange: (newValue: Asset) => void;
}

export const AssetSelector: FC<Props> = ({value, onChange}) => {
    const balances = useBalancesSelector();
    const assetsList = sortAssets(useAssetsListSelector(), balances);

    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredAssetsList, setFilteredAssetsList] = useState(assetsList);
    const {listWidth, modalSheetRef} = useModalWidth(isOpen);

    const handleOpenClick = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleAssetClick = (newValue: Asset) => {
        setIsOpen(false);
        setSearchValue('');
        onChange(newValue);
    };
    const handleClearInput = () => {
        setSearchValue('');
        setFilteredAssetsList(assetsList);
    };
    const filterAssets = useMemo(
        () =>
            debounce((searchTerm: string) => {
                const lowercaseSearchTerm = searchTerm.toLowerCase();

                const filteredAssets = assetsList.filter(
                    asset =>
                        asset.symbol
                            .toLowerCase()
                            .includes(lowercaseSearchTerm) ||
                        asset.name
                            .toLowerCase()
                            .includes(lowercaseSearchTerm) ||
                        asset.address
                            .toLowerCase()
                            .includes(lowercaseSearchTerm)
                );

                const sortedAssets = sortAssets(filteredAssets, balances);

                setFilteredAssetsList(sortedAssets);
            }, 1000),
        [assetsList, balances]
    );

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        filterAssets(value);
    };

    return (
        <>
            <div
                className={styles.selected_asset_button}
                onClick={handleOpenClick}
            >
                <img className={styles.img} src={value.image} />
                <p className={styles.p}>{value.symbol}</p>
                <ChevronRightIcon />
            </div>

            <Sheet
                isOpen={isOpen}
                onClose={handleClose}
                className={styles.modalSheet}
                snapPoints={[700]}
                initialSnap={0}
            >
                <Sheet.Container className={styles.modalSheetContainer}>
                    <Sheet.Header />
                    <Sheet.Content disableDrag={true}>
                        <div className={styles.modalDiv}>
                            <p className={styles.modalP}>Assets</p>
                        </div>
                        <div className={styles.modalInputContainer}>
                            <input
                                className={styles.modalInput}
                                placeholder="Search assets"
                                value={searchValue}
                                onChange={e =>
                                    handleSearchChange(e.target.value)
                                }
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
                                    onClick={handleClearInput}
                                    height="20px"
                                />
                            )}
                        </div>
                        <div ref={modalSheetRef} className={styles.modalList}>
                            <div className={styles.listWrapDiv}>
                                <List
                                    width={listWidth}
                                    height={490}
                                    rowCount={filteredAssetsList.length}
                                    rowHeight={70}
                                    className={styles.list}
                                    containerStyle={{
                                        width: listWidth
                                    }}
                                    rowRenderer={props => (
                                        <AssetListItem
                                            key={props.key}
                                            style={props.style}
                                            asset={
                                                filteredAssetsList[props.index]
                                            }
                                            onClick={handleAssetClick}
                                            selectedAsset={value}
                                            balance={
                                                balances[
                                                    filteredAssetsList[
                                                        props.index
                                                    ].address
                                                ]
                                            }
                                        />
                                    )}
                                />
                            </div>
                            <div className={styles.modalButtonConatiner}>
                                <button onClick={handleClose}>Cancel</button>
                            </div>
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onTap={handleClose} />
            </Sheet>
        </>
    );
};
