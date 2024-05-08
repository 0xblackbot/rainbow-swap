import {useContext, useEffect, useRef, useState} from 'react';
import Sheet from 'react-modal-sheet';
import {List} from 'react-virtualized';

import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon';
import {InputOutputContext} from '../../context/input-output.provider';
import {IAssets} from '../../interfaces/assets.interface';
import {SelectListItem} from '../../shared/SelectListItem/SelectListItem';
import styles from '../OutputTokenModal/TokenModal.module.css';

export const InputTokenModal = () => {
    const {modalInputOpen, setInputModalOpen, setInputToken, assets} =
        useContext(InputOutputContext);
    const [listWidth, setListWidth] = useState(window.innerWidth);
    const modalSheetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (modalSheetRef.current) {
                setListWidth(modalSheetRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function rowRenderer({
        key,
        index,
        style
    }: {
        key: string;
        index: number;
        isScrolling: boolean;
        isVisible: boolean;
        style: React.CSSProperties;
    }) {
        return (
            <div key={key} style={style}>
                <SelectListItem
                    key={index}
                    token={assets[index]}
                    onClick={selectInputToken}
                />
            </div>
        );
    }

    const closeModal = () => {
        setInputModalOpen(false);
    };

    const selectInputToken = (token: IAssets) => {
        setInputToken(token);
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
                            <p className={styles.modalP}>Choose input token</p>
                        </div>
                        <input
                            className={styles.modalInput}
                            placeholder="Search tokens on Etherium"
                        />

                        <div ref={modalSheetRef} className={styles.modalList}>
                            <List
                                width={listWidth}
                                height={600}
                                rowCount={assets.length}
                                rowHeight={50}
                                rowRenderer={rowRenderer}
                            />
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </>
    );
};
