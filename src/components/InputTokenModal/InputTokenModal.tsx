import {useContext} from 'react';
import Sheet from 'react-modal-sheet';

import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon';
import {InputOutputContext} from '../../context/input-output.provider';
import {IAssetsPair} from '../../interfaces/assets.interface';
import {SelectListItem} from '../../shared/SelectListItem/SelectListItem';
import styles from '../OutputTokenModal/TokenModal.module.css';

export const InputTokenModal = () => {
    const {modalInputOpen, setInputModalOpen, setInputToken, assets} =
        useContext(InputOutputContext);

    const closeModal = () => {
        setInputModalOpen(false);
    };

    const selectInputToken = (token: IAssetsPair) => {
        setInputToken(token);
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
                            <p className={styles.modalP}>Choose input token</p>
                        </div>
                        <input
                            className={styles.modalInput}
                            placeholder="Search tokens on Etherium"
                        />
                        {assets.map((asset, index) => {
                            return (
                                <SelectListItem
                                    key={index}
                                    token={asset}
                                    onClick={selectInputToken}
                                />
                            );
                        })}
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </>
    );
};
