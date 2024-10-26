import {Action, combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/es/storage';

import {resetState} from '../actions';
import {assetsReducers} from '../assets/assets-reducers';
import {devReducers} from '../dev/dev-reducers';
import {RootState} from '../index';
import {initializedReducers} from '../initialized/initialized-reducers';
import {pointsReducers} from '../points/points-reducers';
import {securityReducers} from '../security/security-reducers';
import {settingsReducers} from '../settings/settings-reducers';
import {swapRoutesReducers} from '../swap-routes/swap-routes-reducers';
import {walletReducers} from '../wallet/wallet-reducers';

export const rootReducer = combineReducers({
    assets: assetsReducers,
    swapRoutes: swapRoutesReducers,
    wallet: walletReducers,
    settings: settingsReducers,
    pointsV2: pointsReducers,
    dev: devReducers,
    security: securityReducers,
    initialized: initializedReducers
});

const resettableRootReducer = (
    state: RootState | undefined,
    action: Action
) => {
    if (resetState.match(action)) {
        return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
};

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['swapRoutes', 'initialized'],

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stateReconciler: autoMergeLevel2 as any
};

export const persistedReducer = persistReducer(
    persistConfig,
    resettableRootReducer
);
