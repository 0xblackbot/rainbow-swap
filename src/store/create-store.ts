import {configureStore} from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import {createEpicMiddleware} from 'redux-observable';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';

import {rootEpic} from './root-state/root-state-epics';
import {persistedReducer} from './root-state/root-state.reducers';

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];

const sentryReduxEnhancer = Sentry.createReduxEnhancer();

export const createStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER
                    ],
                    warnAfter: 400
                },
                immutableCheck: {
                    warnAfter: 600
                }
            }).concat(middlewares);
        },
        enhancers: getDefaultEnhancers => {
            return getDefaultEnhancers().concat(sentryReduxEnhancer);
        }
    });

    const persistor = persistStore(store);

    epicMiddleware.run(rootEpic);

    return {store, persistor};
};
