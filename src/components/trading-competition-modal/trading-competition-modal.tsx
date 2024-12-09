import {FC} from 'react';

import {CompetitionInfo} from './competition-info/competition-info';
import styles from './trading-competition-modal.module.css';
import {ModalProps} from '../../interfaces/modal-props.intefrace';
import {BottomSheet} from '../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../shared/form-button/form-button';

export const TradingCompetitionModal: FC<ModalProps> = ({isOpen, onClose}) => (
    <BottomSheet isOpen={isOpen} headerTitle="" onClose={onClose}>
        <div className={styles.content_container}>
            <CompetitionInfo onClose={onClose} />
        </div>
        <FormButton
            text="Close"
            containerClassName={styles.footer_container}
            onClick={onClose}
        ></FormButton>
    </BottomSheet>
);
