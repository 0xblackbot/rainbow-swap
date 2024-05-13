import {FC, useState} from 'react';
import Sheet from 'react-modal-sheet';
import {List} from 'react-virtualized';

import {AssetListItem} from './asset-list-item/asset-list-item.tsx';
import styles from './asset-selector.module.css';
import {ChevronDownIcon} from '../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon.tsx';
import {useModalWidth} from '../../hooks/use-modal-width.hook.tsx';
import {Asset} from '../../interfaces/asset.interface';
import {useAssetsListSelector} from '../../store/assets/assets-selectors.ts';

interface Props {
    value: Asset;
    onChange: (newValue: Asset) => void;
}

export const AssetSelector: FC<Props> = ({value, onChange}) => {
    const assetsList = useAssetsListSelector();

    const [isOpen, setIsOpen] = useState(false);
    const {listWidth, modalSheetRef} = useModalWidth(isOpen);

    const handleOpenClick = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleAssetClick = (newValue: Asset) => {
        setIsOpen(false);
        onChange(newValue);
    };

    return (
        <>
            <div
                className={styles.selected_asset_button}
                onClick={handleOpenClick}
            >
                <img className={styles.img} src={value.image} />
                <p className={styles.p}>{value.symbol}</p>
                <ChevronDownIcon />
            </div>

            <Sheet
                isOpen={isOpen}
                snapPoints={[700]}
                initialSnap={0}
                onClose={handleClose}
            >
                <Sheet.Container className={styles.modalSheetContainer}>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className={styles.modalDiv}>
                            <button
                                className={styles.modalButton}
                                onClick={handleClose}
                            >
                                <ChevronLeftIcon />
                            </button>
                            <p className={styles.modalP}>Choose input asset</p>
                        </div>
                        <input
                            className={styles.modalInput}
                            placeholder="Search assets on Etherium"
                        />

                        <div ref={modalSheetRef} className={styles.modalList}>
                            <List
                                width={listWidth}
                                height={600}
                                rowCount={assetsList.length}
                                rowHeight={50}
                                containerStyle={{
                                    width: listWidth
                                }}
                                rowRenderer={props => (
                                    <AssetListItem
                                        key={props.key}
                                        style={props.style}
                                        asset={assetsList[props.index]}
                                        onClick={handleAssetClick}
                                    />
                                )}
                            />
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </>
    );
};
