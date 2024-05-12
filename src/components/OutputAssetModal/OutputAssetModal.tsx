import {FC} from 'react';
import Sheet from 'react-modal-sheet';
import {List} from 'react-virtualized';

import styles from './AssetModal.module.css';
import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon';
import {useAssetsContext} from '../../context/assets/assets.hook';
import {useModalContext} from '../../context/modal/modal.hook';
import {useModalWidth} from '../../hooks/use-modal-width.hook';
import {Asset} from '../../interfaces/asset.interface';
import {rowRenderer} from '../../shared/RowRenderer/RowRenderer';
import {useAssetsListSelector} from '../../store/assets/assets-selectors.ts';

export const OutputAssetModal: FC = () => {
    const assetsList = useAssetsListSelector();
    const {modalOutputOpen, setOutputModalOpen} = useModalContext();
    const {setOutputAsset} = useAssetsContext();
    const {listWidth, modalSheetRef} = useModalWidth(modalOutputOpen);

    const closeModal = () => {
        setOutputModalOpen(false);
    };

    const selectOutputAsset = (asset: Asset) => {
        setOutputAsset(asset);
        closeModal();
    };

    return (
        <>
            <Sheet
                isOpen={modalOutputOpen}
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
                            <p className={styles.modalP}>Choose output asset</p>
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
                                        selectOutputAsset,
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
