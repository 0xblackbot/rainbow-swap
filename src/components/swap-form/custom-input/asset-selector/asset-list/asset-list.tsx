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
import {
    useAssetsListSelector,
    useIsAssetsLoadingSelector
} from '../../../../../store/assets/assets-selectors';
import {setAssetsSearchValue} from '../../../../../store/initialized/runtime-actions';
import {useAssetsSearchValueSelector} from '../../../../../store/initialized/runtime-selectors';
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
    const dispatch = useDispatch();
    const divHeight = useDivHeight();

    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<FixedSizeList>(null);

    const searchValue = useAssetsSearchValueSelector();
    const assetsList = useAssetsListSelector();
    const isAssetsLoading = useIsAssetsLoadingSelector();
    const balancesRecord = useBalancesRecordSelector();

    const sortedAssetsList = useMemo(
        () => sortAssets(assetsList, balancesRecord),
        [assetsList, balancesRecord]
    );

    const data = useMemo(() => {
        const listProps: AssetListItemProps = {
            isLoading: isAssetsLoading,
            dataArray: sortedAssetsList.map(asset => ({
                asset,
                balance:
                    formatNumber(
                        parseFloat(balancesRecord[asset.address]),
                        2
                    ) ?? '0',
                onClick: () => onChange(asset)
            }))
        };

        const isListEmpty =
            !isAssetsLoading && listProps.dataArray.length === 0;

        return {
            listProps,
            isListEmpty
        };
    }, [isAssetsLoading, sortedAssetsList, balancesRecord, onChange]);

    const itemCount = useMemo(() => {
        const dataLength =
            searchValue === ''
                ? data.listProps.dataArray.length + 1 // "Search hint" component
                : data.listProps.dataArray.length;

        if (isAssetsLoading) {
            return Math.max(15, dataLength); // show skeletons
        } else {
            return dataLength;
        }
    }, [searchValue, isAssetsLoading, data.listProps.dataArray.length]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!IS_TMA && isOpen && inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [isOpen]);

    useEffect(() => {
        if (!isAssetsLoading && listRef.current) {
            listRef.current.scrollTo(0);
        }
    }, [isAssetsLoading]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setAssetsSearchValue(event.target.value));
    const handleInputClear = () => dispatch(setAssetsSearchValue(''));

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
                {data.isListEmpty ? (
                    <AssetNoResult />
                ) : (
                    <FixedSizeList
                        ref={listRef}
                        itemSize={66}
                        itemData={data.listProps}
                        itemCount={itemCount}
                        width="100%"
                        height={divHeight.height}
                    >
                        {AssetListItem}
                    </FixedSizeList>
                )}
            </div>
        </>
    );
};
