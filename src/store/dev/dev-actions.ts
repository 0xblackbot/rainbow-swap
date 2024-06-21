import {createAction} from '@reduxjs/toolkit';

export const setDevVersionAction = createAction<number>(
    'dev/SET_STATE_VERSION'
);
