import {
    useDispatch as useRawDispatch,
    useSelector as useRawSelector
} from 'react-redux';

import {createStore} from './create-store';
import {appReducer} from './root-state/root-state.reducers';

export const {store, persistor} = createStore();

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = useRawDispatch.withTypes<AppDispatch>();
export const useSelector = useRawSelector.withTypes<RootState>();
