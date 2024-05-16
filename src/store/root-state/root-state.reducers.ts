import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {assetsReducers} from '../assets/assets-reducers.ts';
import {balancesReducers} from '../balances/balances-reducers.ts';
import {swapRoutesReducers} from '../swap-routes/swap-routes-reducers.ts';

const rootReducer = combineReducers({
    assets: assetsReducers,
    swapRoutes: swapRoutesReducers,
    balances: balancesReducers
});

export const persistedReducer = persistReducer(
    {
        key: 'root',
        storage,
        blacklist: ['swapRoutes']
    },
    rootReducer
);
