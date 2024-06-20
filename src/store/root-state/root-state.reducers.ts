import {Action, combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/es/storage';

import {resetState} from '../actions.ts';
import {assetsReducers} from '../assets/assets-reducers.ts';
import {devReducers} from '../dev/dev-reducers.ts';
import {RootState} from '../index.ts';
import {settingsReducers} from '../settings/settings-reducers.ts';
import {swapRoutesReducers} from '../swap-routes/swap-routes-reducers.ts';
import {walletReducers} from '../wallet/wallet-reducers.ts';

export const appReducer = combineReducers({
    assets: assetsReducers,
    swapRoutes: swapRoutesReducers,
    wallet: walletReducers,
    settings: settingsReducers,
    dev: devReducers
});

const rootReducer = (state: RootState | undefined, action: Action) => {
    if (resetState.match(action)) {
        state = undefined;
    }
    return appReducer(state, action);
};

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['swapRoutes'],

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stateReconciler: autoMergeLevel2 as any
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
