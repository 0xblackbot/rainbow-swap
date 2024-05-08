import {useContext} from 'react';
import Sheet from 'react-modal-sheet';
import {List} from 'react-virtualized';

import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon';
import {InputOutputContext} from '../../context/input-output.provider';
import {useModalWidthHook} from '../../hooks/useModalWidthHook/useModalWidthHook';
import {AssetObject} from '../../interfaces/asset-object.interface';
import {rowRenderer} from '../../shared/RowRenderer/RowRenderer';
import styles from '../OutputAssetModal/AssetModal.module.css';

export const InputAssetModal = () => {
    const {modalInputOpen, setInputModalOpen, setInputAsset, assets} =
        useContext(InputOutputContext);
    const {listWidth, modalSheetRef} = useModalWidthHook(modalInputOpen);

    const closeModal = () => {
        setInputModalOpen(false);
    };

    const selectInputAsset = (asset: AssetObject) => {
        setInputAsset(asset);
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
                                rowCount={assets.length}
                                rowHeight={50}
                                rowRenderer={props =>
                                    rowRenderer(props, selectInputAsset, assets)
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
