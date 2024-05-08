import {useContext, useEffect, useRef, useState} from 'react';
import Sheet from 'react-modal-sheet';
import {List} from 'react-virtualized';

import styles from './TokenModal.module.css';
import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon/ChevronLeftIcon';
import {InputOutputContext} from '../../context/input-output.provider';
import {IAssets} from '../../interfaces/assets.interface';
import {SelectListItem} from '../../shared/SelectListItem/SelectListItem';

export const OutputTokenModal = () => {
    const {modalOutputOpen, setOutputModalOpen, setOutputToken, assets} =
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

    const closeModal = () => {
        setOutputModalOpen(false);
    };

    const selectOutputToken = (token: IAssets) => {
        setOutputToken(token);
        closeModal();
    };

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
                    onClick={selectOutputToken}
                />
            </div>
        );
    }

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
