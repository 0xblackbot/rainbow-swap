import {useContext} from 'react';
import Sheet from 'react-modal-sheet';

import {fakeData} from '../../assets/fake-data';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon';
import {Context} from '../../context/ContextProvider';
import './OutputTokenModal.css';
import {IToken} from '../../interfaces/token.interface';
import SelectListItem from '../../shared/SelectListItem/SelectListItem';

const OutputTokenModal = () => {
    const {modalOutputOpen, setOutputModalOpen, setOutputToken} =
        useContext(Context);

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
                        <div className="modal-window-div">
                            <button
                                className="modal-window-button"
                                onClick={closeModal}
                            >
                                <ChevronLeftIcon />
                            </button>
                            <p className="modal-window-p">
                                Choose output token
                            </p>
                        </div>
                        <input
                            className="modal-window-input"
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

export default OutputTokenModal;
