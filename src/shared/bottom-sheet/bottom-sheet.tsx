import {FC, PropsWithChildren, useEffect, useState} from 'react';

import styles from './bottom-sheet.module.css';
import {XIcon} from '../../assets/icons/XIcon/XIcon';
import {useTrackPageView} from '../../hooks/use-analytics.hook';
import {useEnableBackButton} from '../../hooks/use-enable-back-button.hook';
import {usePreventScroll} from '../../hooks/use-prevent-scrolling.hook';
import {useViewportHeight} from '../../hooks/viewport-height/viewport-height.hook';
import {getClassName} from '../../utils/style.utils';
import {ContentContainer} from '../content-container/content-container';

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

    usePreventScroll(isOpen);
    useTrackPageView(headerTitle, isOpen);
    useEnableBackButton(isOpen, onClose);

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
                                <p className={styles.header_text}>
                                    {headerTitle}
                                </p>
                                <button
                                    className={styles.header_button}
                                    onClick={onClose}
                                >
                                    <XIcon
                                        className={styles.xIcon}
                                        width="24px"
                                        height="24px"
                                    />
                                </button>
                            </div>
                            {children}
                        </>
                    )}
                </div>
            </ContentContainer>
        </div>
    );
};
