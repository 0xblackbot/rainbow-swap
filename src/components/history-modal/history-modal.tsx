import {FC} from 'react';

import styles from './history-modal.module.css';
import {PendingSwap} from './pending-swap/pending-swap';
import {ModalProps} from '../../interfaces/modal-props.intefrace';
import {BottomSheet} from '../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../shared/form-button/form-button';

export const HistoryModal: FC<ModalProps> = ({isOpen, onClose}) => (
    <BottomSheet isOpen={isOpen} headerTitle="" onClose={onClose}>
        <div className={styles.content_container}>
            <PendingSwap />
        </div>
        <FormButton
            text="Close"
            containerClassName={styles.footer_container}
            onClick={onClose}
        ></FormButton>
    </BottomSheet>
);
