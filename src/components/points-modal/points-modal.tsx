import styles from './points-modal.module.css';
import {Tasks} from './tasks/tasks';
import {BottomSheet} from '../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../shared/form-button/form-button';
import {useDispatch} from '../../store';
import {closePointsModal} from '../../store/points/points-actions';
import {useIsPointsModalOpenSelector} from '../../store/points/points-selectors';

export const PointsModal = () => {
    const dispatch = useDispatch();
    const isOpen = useIsPointsModalOpenSelector();

    const handleClose = () => dispatch(closePointsModal());

    return (
        <BottomSheet
            isOpen={isOpen}
            headerTitle="Complete tasks"
            onClose={handleClose}
        >
            <div className={styles.content_container}>
                <Tasks />

                <FormButton
                    text="Close"
                    containerClassName={styles.swap_button}
                    onClick={handleClose}
                ></FormButton>
            </div>
        </BottomSheet>
    );
};
