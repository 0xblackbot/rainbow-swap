import {createReducer} from '@reduxjs/toolkit';

import {closePointsModal, openPointsModal} from './points-actions';
import {pointsInitialState, PointsState} from './points-state';

export const pointsReducers = createReducer<PointsState>(
    pointsInitialState,
    builder => {
        builder.addCase(openPointsModal, state => ({
            ...state,
            isModalOpen: true
        }));
        builder.addCase(closePointsModal, state => ({
            ...state,
            isModalOpen: false
        }));
    }
);
