import {useContext} from 'react';
import Sheet from 'react-modal-sheet';

import {fakeData} from '../../assets/fake-data';
import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon';
import {InputOutputContext} from '../../context/input-output.provider';
import {IToken} from '../../interfaces/token.interface';
import {SelectListItem} from '../../shared/SelectListItem/SelectListItem';
import styles from '../OutputTokenModal/TokenModal.module.css';

export const InputTokenModal = () => {
    const {modalInputOpen, setInputModalOpen, setInputToken} =
        useContext(InputOutputContext);

    const closeModal = () => {
        setInputModalOpen(false);
    };

    const selectInputToken = (token: IToken) => {
        setInputToken(token);
    };

    return (
        <>
            <Sheet
                isOpen={modalInputOpen}
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
                            <p className={styles.modalP}>Choose input token</p>
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
