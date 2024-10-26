import {FC} from 'react';

import {ReferrerStats} from './referrer-stats/referrer-stats';
import styles from './rewards-modal.module.css';
import {ModalProps} from '../../interfaces/modal-props.intefrace';
import {BottomSheet} from '../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../shared/form-button/form-button';

export const RewardsModal: FC<ModalProps> = ({isOpen, onClose}) => (
    <BottomSheet isOpen={isOpen} headerTitle="Rewards Center" onClose={onClose}>
        <div className={styles.content_container}>
            <ReferrerStats />
        </div>
        <FormButton
            text="Close"
            containerClassName={styles.footer_container}
            onClick={onClose}
        ></FormButton>
    </BottomSheet>
);
