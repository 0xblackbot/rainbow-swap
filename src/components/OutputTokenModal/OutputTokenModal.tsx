import {useContext} from 'react';
import Sheet from 'react-modal-sheet';

import styles from './TokenModal.module.css';
import {fakeData} from '../../assets/fake-data';
import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon';
import {InputOutputContext} from '../../context/input-output.provider';
import {IToken} from '../../interfaces/token.interface';
import {SelectListItem} from '../../shared/SelectListItem/SelectListItem';

export const OutputTokenModal = () => {
    const {modalOutputOpen, setOutputModalOpen, setOutputToken} =
        useContext(InputOutputContext);

    const closeModal = () => {
        setOutputModalOpen(false);
    };

    const selectOutputToken = (token: IToken) => {
        setOutputToken(token);
    };

    return (
        <>
            <Sheet
                isOpen={modalOutputOpen}
                onClose={closeModal}
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
                        {fakeData.map(token => {
                            return (
                                <SelectListItem
                                    key={token.id}
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
