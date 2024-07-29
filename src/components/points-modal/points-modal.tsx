import {BottomSheet} from '../../shared/bottom-sheet/bottom-sheet';
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
            headerTitle="Tap-tap"
            onClose={handleClose}
        >
            <p>Hello hello</p>
        </BottomSheet>
    );
};
