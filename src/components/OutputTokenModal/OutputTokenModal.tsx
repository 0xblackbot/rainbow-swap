import {useContext} from 'react';
import Sheet from 'react-modal-sheet';

import styles from './TokenModal.module.css';
import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon';
import {InputOutputContext} from '../../context/input-output.provider';
import {IAssetsPair} from '../../interfaces/assets.interface';
import {SelectListItem} from '../../shared/SelectListItem/SelectListItem';

export const OutputTokenModal = () => {
    const {modalOutputOpen, setOutputModalOpen, setOutputToken, assets} =
        useContext(InputOutputContext);

    const closeModal = () => {
        setOutputModalOpen(false);
    };

    const selectOutputToken = (token: IAssetsPair) => {
        setOutputToken(token);
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
                            <p className={styles.modalP}>Choose output token</p>
                        </div>
                        <input
                            className={styles.modalInput}
                            placeholder="Search tokens on Etherium"
                        />
                        {assets.map((token, index) => {
                            return (
                                <SelectListItem
                                    key={index}
                                    token={token}
                                    onClick={selectOutputToken}
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
