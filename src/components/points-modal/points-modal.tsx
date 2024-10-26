import {useCallback} from 'react';

import {InviteFriends} from './invite-friends/invite-friends';
import styles from './points-modal.module.css';
import {SocialTasks} from './social-tasks/social-tasks';
import {BottomSheet} from '../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../shared/form-button/form-button';
import {useDispatch} from '../../store';
import {closePointsModal} from '../../store/points/points-actions';
import {useIsPointsModalOpenSelector} from '../../store/points/points-selectors';

export const PointsModal = () => {
    const dispatch = useDispatch();
    const isOpen = useIsPointsModalOpenSelector();

    const handleClose = useCallback(
        () => dispatch(closePointsModal()),
        [dispatch]
    );

    return (
        <BottomSheet isOpen={isOpen} headerTitle="" onClose={handleClose}>
            <div className={styles.content_container}>
                <InviteFriends />
                <SocialTasks />
            </div>
            <FormButton
                text="Close"
                containerClassName={styles.footer_container}
                onClick={handleClose}
            ></FormButton>
        </BottomSheet>
    );
};
