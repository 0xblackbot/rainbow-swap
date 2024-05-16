import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/es/storage';

import {assetsReducers} from '../assets/assets-reducers.ts';
import {walletReducers} from '../balances/wallet-reducers.ts';
import {swapRoutesReducers} from '../swap-routes/swap-routes-reducers.ts';

export const rootReducer = combineReducers({
    assets: assetsReducers,
    swapRoutes: swapRoutesReducers,
    balances: walletReducers
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['swapRoutes'],

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stateReconciler: autoMergeLevel2 as any
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
