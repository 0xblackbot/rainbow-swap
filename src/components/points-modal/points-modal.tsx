import {FC} from 'react';

import {InviteFriends} from './invite-friends/invite-friends';
import styles from './points-modal.module.css';
import {SocialTasks} from './social-tasks/social-tasks';
import {ModalProps} from '../../interfaces/modal-props.intefrace';
import {BottomSheet} from '../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../shared/form-button/form-button';

export const PointsModal: FC<ModalProps> = ({isOpen, onClose}) => (
    <BottomSheet isOpen={isOpen} headerTitle="" onClose={onClose}>
        <div className={styles.content_container}>
            <InviteFriends />
            <SocialTasks onSwap={onClose} />
        </div>
        <FormButton
            text="Close"
            containerClassName={styles.footer_container}
            onClick={onClose}
        ></FormButton>
    </BottomSheet>
);
