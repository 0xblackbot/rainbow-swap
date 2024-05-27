import {FC, PropsWithChildren, useMemo} from 'react';

import styles from './bottom-sheet.module.css';
import {XCircleIcon} from '../../assets/icons/XCircleIcon/XCircleIcon.tsx';
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
    const initialViewportHeight = useMemo(
        () => window.Telegram.WebApp.viewportHeight,
        []
    );

    return (
        <div
            className={getClassName(
                styles.modal_backdrop,
                isOpen ? styles.open : styles.close
            )}
            style={{height: initialViewportHeight}}
            onClick={onClose}
        >
            <ContentContainer>
                <div
                    className={styles.modal_content}
                    style={{height: 0.9 * initialViewportHeight}}
                    onClick={e => e.stopPropagation()}
                >
                    <div className={styles.header_container}>
                        <div className={styles.empty_container} />
                        <p className={styles.header_text}>{headerTitle}</p>
                        <XCircleIcon
                            className={styles.xcircleIcon}
                            width="32px"
                            height="32px"
                            onClick={onClose}
                        />
                    </div>
                    {children}
                </div>
            </ContentContainer>
        </div>
    );
};
