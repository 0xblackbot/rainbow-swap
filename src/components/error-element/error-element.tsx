import {useEffect} from 'react';

import {isProd} from '../../globals';
import {useDispatch} from '../../store';
import {resetState} from '../../store/actions';

// eslint-disable-next-line react-refresh/only-export-components
const ProductionErrorElement = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState());

        location.reload();
    }, [dispatch]);

    return null;
};

export const getErrorElement = () => {
    if (isProd) {
        return <ProductionErrorElement />;
    }

    return undefined;
};
