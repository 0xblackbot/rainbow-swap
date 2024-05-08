import {useContext} from 'react';
import Sheet from 'react-modal-sheet';
import {List} from 'react-virtualized';

import styles from './AssetModal.module.css';
import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon';
import {InputOutputContext} from '../../context/input-output.provider';
import {useModalWidthHook} from '../../hooks/useModalWidthHook/useModalWidthHook';
import {AssetObject} from '../../interfaces/asset-object.interface';
import {rowRenderer} from '../../shared/RowRenderer/RowRenderer';

export const OutputAssetModal = () => {
    const {modalOutputOpen, setOutputModalOpen, setOutputAsset, assets} =
        useContext(InputOutputContext);
    const {listWidth, modalSheetRef} = useModalWidthHook(modalOutputOpen);

    const closeModal = () => {
        setOutputModalOpen(false);
    };

    const selectOutputAsset = (asset: AssetObject) => {
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
                                rowCount={assets.length}
                                rowHeight={50}
                                rowRenderer={props =>
                                    rowRenderer(
                                        props,
                                        selectOutputAsset,
                                        assets
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
