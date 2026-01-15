import {createAction} from '@reduxjs/toolkit';

export const setAssetsSearchValue = createAction<string>(
    'runtime/SET_ASSETS_SEARCH_VALUE'
);

export const assetsInitializedAction = createAction(
    'runtime/ASSETS_INITIALIZED'
);
