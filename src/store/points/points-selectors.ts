import {useSelector} from '../index';

export const useIsPointsModalOpenSelector = () =>
    useSelector(({points}) => points.isModalOpen);
