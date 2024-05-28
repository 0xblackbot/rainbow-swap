import {FC, PropsWithChildren, useEffect, useState} from 'react';

import styles from './bottom-sheet.module.css';
import {XCircleIcon} from '../../assets/icons/XCircleIcon/XCircleIcon.tsx';
import {useViewportHeight} from '../../hooks/viewport-height/viewport-height.hook.ts';
import {FormButton} from '../../shared/FormButton/FormButton.tsx';
import {getClassName} from '../../utils/style.utils.ts';
import {ContentContainer} from '../content-container/content-container.tsx';

interface Props extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    headerTitle: string;
}

export const BottomSheet: FC<Props> = ({
    isOpen,
    onClose,
    headerTitle,
    children
}) => {
    const viewportHeight = useViewportHeight();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 400);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <div
            className={getClassName(
                styles.modal_backdrop,
                isOpen ? styles.open : styles.close
            )}
            style={{height: viewportHeight.value}}
            onClick={onClose}
        >
            <ContentContainer>
                <div
                    className={styles.modal_content}
                    style={{height: 0.9 * viewportHeight.value}}
                    onClick={e => e.stopPropagation()}
                >
                    {isVisible && (
                        <>
                            <div className={styles.header_container}>
                                <div className={styles.empty_container}/>
                                <p className={styles.header_text}>
                                    {headerTitle}
                                </p>
                                <XCircleIcon
                                    className={styles.xcircleIcon}
                                    width="32px"
                                    height="32px"
                                    onClick={onClose}
                                />
                            </div>
                            {children}
                            <div className={styles.footer_container}>
                                <FormButton
                                    text="Close"
                                    onClick={onClose}
                                ></FormButton>
                            </div>
                        </>
                    )}
                </div>
            </ContentContainer>
        </div>
    );
};
