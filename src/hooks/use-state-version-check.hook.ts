import {useEffect} from 'react';

import {PROD_STATE_VERSION} from '../globals';
import {useDispatch} from '../store';
import {resetState} from '../store/actions';
import {setDevVersionAction} from '../store/dev/dev-actions';
import {useDevVersionSelector} from '../store/dev/dev-selectors';

export const useStateVersionCheck = () => {
    const dispatch = useDispatch();
    const stateVersion = useDevVersionSelector();

    useEffect(() => {
        if (stateVersion !== PROD_STATE_VERSION) {
            dispatch(resetState());
            dispatch(setDevVersionAction(PROD_STATE_VERSION));
        }
    }, [dispatch, stateVersion]);
};
