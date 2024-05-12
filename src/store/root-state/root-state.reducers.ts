import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {assetsReducers} from '../assets/assets-reducers.ts';

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    assets: assetsReducers
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
