import {FC} from 'react';
import Sheet from 'react-modal-sheet';
import {List} from 'react-virtualized';

import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon';
import {useAssetsContext} from '../../context/assets/assets.hook';
import {useModalContext} from '../../context/modal/modal.hook';
import {useModalWidth} from '../../hooks/use-modal-width.hook';
import {Asset} from '../../interfaces/asset.interface';
import {rowRenderer} from '../../shared/RowRenderer/RowRenderer';
import {useAssetsListSelector} from '../../store/assets/assets-selectors.ts';
import styles from '../OutputAssetModal/AssetModal.module.css';

export const InputAssetModal: FC = () => {
    const assetsList = useAssetsListSelector();
    const {modalInputOpen, setInputModalOpen} = useModalContext();
    const {setInputAsset, setInputAssetAmount} = useAssetsContext();
    const {listWidth, modalSheetRef} = useModalWidth(modalInputOpen);

    const closeModal = () => {
        setInputModalOpen(false);
    };

    const selectInputAsset = (asset: Asset) => {
        setInputAsset(asset);
        setInputAssetAmount('');
        closeModal();
    };

    return (
        <>
            <Sheet
                isOpen={modalInputOpen}
                onClose={closeModal}
                className={styles.modalSheet}
                snapPoints={[700]}
                initialSnap={0}
            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className={styles.modalDiv}>
                            <button
                                className={styles.modalButton}
                                onClick={closeModal}
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
                                rowRenderer={props =>
                                    rowRenderer(
                                        props,
                                        selectInputAsset,
                                        assetsList
                                    )
                                }
                            />
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </>
    );
};
