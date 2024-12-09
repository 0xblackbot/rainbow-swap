import {Action, combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/es/storage';

import {resetState} from '../actions';
import {assetsReducers} from '../assets/assets-reducers';
import {devReducers} from '../dev/dev-reducers';
import {RootState} from '../index';
import {runtimeReducers} from '../initialized/runtime-reducers';
import {securityReducers} from '../security/security-reducers';
import {settingsReducers} from '../settings/settings-reducers';
import {swapRoutesReducers} from '../swap-routes/swap-routes-reducers';
import {tradingCompetitionReducers} from '../trading-competition/trading-competition-reducers';
import {walletReducers} from '../wallet/wallet-reducers';

export const rootReducer = combineReducers({
    assets: assetsReducers,
    swapRoutes: swapRoutesReducers,
    wallet: walletReducers,
    settings: settingsReducers,
    dev: devReducers,
    security: securityReducers,
    tradingCompetition: tradingCompetitionReducers,
    runtime: runtimeReducers
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
    blacklist: ['swapRoutes', 'runtime'],

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stateReconciler: autoMergeLevel2 as any
};

export const persistedReducer = persistReducer(
    persistConfig,
    resettableRootReducer
);
