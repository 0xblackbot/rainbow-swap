import {combineEpics, Epic} from 'redux-observable';
import {from, of} from 'rxjs';
import {bufferTime, catchError, filter, map, switchMap} from 'rxjs/operators';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {addTapActions, loadPointsActions} from './points-actions';
import {getPointsAuth, postAddTaps} from '../../utils/api.utils';
import {USER_ID} from "../../globals";

const loadPointsEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(loadPointsActions.submit),
        toPayload(),
        switchMap(payload =>
            from(getPointsAuth(payload)).pipe(
                map(response => loadPointsActions.success(response)),
                catchError(err => of(loadPointsActions.fail(err.message)))
            )
        )
    );

const addTapEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(addTapActions.submit),
        toPayload(),
        bufferTime(5000),
        filter(taps => taps.length > 0),
        switchMap(taps =>
            from(postAddTaps({userId: USER_ID, taps})).pipe(
                map(() => addTapActions.success()),
                catchError(err => of(addTapActions.fail(err.message)))
            )
        )
    );

export const pointsEpics = combineEpics(loadPointsEpic, addTapEpic);
